var ApiException = require(APPROOT + 'src/Timerizer/Exception/ApiException');

function AbstractRestController(args)
{
	if (!args || !args.express)
	{
		throw 'Invalid argument for creating the controller. You must provide the [express] instance and the [parent] for the controller';
	}

	this.express = args.express;
	this.parent = args.parent;
	this.services = args.express.services;

	this.configureRoutes();
}

AbstractRestController.prototype = {
	/**
	 * @var Express expressjs instance
	 */
	express: null,

	/**
	 * @var Object Service defintion
	 */
	services: null,

	/**
	 * @var Express.Request HTTP request
	 */
	request: null,

	/**
	 * @var Express.Response HTTP response
	 */
	response: null,

	/**
	 * @var String Namespace of the parent Controller, e.g: /Controller1/Controller2/Controller3
	 */
	parent: null,

	/**
	 * @var String Name of the endpoint resource, e.g GET endpointx/{id} <-- resource = endpointx
	 */
	resourceName: null,

	/**
	 * Configure the existing routes using the controller/parent conbtroller definitions
	 * By default the child controller can implement any of this calls
	 * @return void
	 */
	getCollection: null,
	getResource: null,
	postCollection: null,
	postResource: null,
	putCollection: null,
	putResource: null,
	patchCollection: null,
	patchResource: null,
	deleteCollection: null,
	deleteResource: null,
	optionsCollection: null,
	optionsResource: null,

	throw: function(error, detail)
	{
		if (detail)
		{
			console.log(detail.stack ? detail.stack : detail);
		}

		if (error instanceof ApiException)
		{
			this.response.statusCode = error.code;
			return this.response.jsonp(
			{
				error_code: error.statusCode,
				message:error.message
			});
		}
		else
		{
			console.log(error);
			this.response.statusCode = 500;
			return this.response.jsonp(
			{
				error_code: 0,
				message:'Unknow error'
			});
		}
	},

	init: function(req, res){
		this.request = req;
		this.response = res;
	},

	/**
	 * This method can be executed before any other in the gived controller
	 * @return void
	 */
	before: null,

	setExpress: function(express)
	{
		this.express = express;
	},

	/**
	 * Build the respective route using the controller/parents specs
	 * @return object The route definition
	 */
	getRoutes: function()
	{
		if (!this.resourceName)
		{
			throw 'You must define the [resourceName] of the Controller';
		}

		var pathCollection = '/' + this.resourceName;
		var pathResource = pathCollection + '/:' + this.resourceName + '_id';

		if (this.parent !== null && typeof this.parent !== 'undefined')
		{
			var Controllers = this.parent.split('/');
			var route = '';
			var resourceId = '';

			for (var i in Controllers)
			{
				var controllerName = Controllers[i].toLowerCase();
				resourceId = ':' + controllerName + '_id';

				route += '/' + controllerName;
			}

			pathCollection = route + '/' + resourceId + pathCollection;
			pathResource = pathCollection + '/:' + this.resourceName + '_id';
		}

		return {
			collection: pathCollection,
			resource: pathResource
		};
	},

	/**
	 * Configure the existing routes using the controller/parentConbtroller definitions
	 * @return void
	 */
	configureRoutes: function()
	{
		var self = this;
		var routes = this.getRoutes();
		var errorHandler = self.errorHandler;

		if (self.getCollection !== null)
		{
			console.log('Route - GET ' + routes.collection);

			self.express.get(routes.collection, function(req, res)
			{
				self.init(req, res);

				if (self.before)
				{
					self.before(req, res, function()
					{
						self.getCollection(req, res);
					});
				}
				else
				{
					self.getCollection(req, res);
				}
			});
		}

		if (self.getResource !== null)
		{
			console.log('Route - GET ' + routes.resource);

			self.express.get(routes.resource, function(req, res)
			{
				self.init(req, res);

				if (self.before)
				{
					self.before(req, res, function()
					{
						self.getResource(req, res);
					});
				}
				else
				{
					self.getResource(req, res);
				}
			});
		}

		if (self.postResource !== null)
		{
			console.log('Route - POST ' + routes.resource);

			self.express.post(routes.resource, function(req, res)
			{
				self.init(req, res);

				if (self.before)
				{
					self.before(req, res, function()
					{
						self.postResource(req, res);
					});
				}
				else
				{
					self.postResource(req, res);
				}
			});
		}
	}
};

module.exports = AbstractRestController;