var AbstractRestController = require(APPROOT + "src/Timerizer/Controller/AbstractRestController");
var Filter = require(APPROOT + "src/Libs/Filter/Filter");
var bitbucket = require('bitbucket-api');
var JiraClient = require('jira-connector');

var ProviderController  = function(options)
{
	this.resourceName = 'provider';
	AbstractRestController.call(this, options);
}

require('util').inherits(ProviderController , AbstractRestController);

ProviderController.prototype.account = null;
ProviderController.prototype.provider = null;

ProviderController.prototype.before = function(req, res, next)
{
	var self = this;

	if (!req.params || !req.params.account_id || !req.params.provider_id)
	{
		return self.throw(new ResourceNotFoundException(req.path));
	}

	// Get the account
	self.services['builder'].process('getAccountByUuid',
	{
		uuid: req.params.account_id
	},
	function(err, response)
	{
		if (err)
		{
			return self.throw(new InternalException(), err);
		}

		if (!response.account)
		{
			return self.throw(new ResourceNotFoundException('Account with uuid ' + req.params.account_id));
		}

		self.account = response.account;

		// Get the provider
		self.services['builder'].process('getProviderById',
		{
			id: req.params.provider_id
		},
		function(err, response)
		{
			if (err)
			{
				return self.throw(new InternalException(), err);
			}

			if (!response.provider)
			{
				return self.throw(new ResourceNotFoundException('Provider with uuid ' + req.params.provider_id));
			}

			self.provider = response.provider;

			next();
		});
	});
};

/*
 * Create a new link between the account and the provider
 */
ProviderController.prototype.postResource = function(req, res)
{
	var self = this;

	var input = new Filter(req.body, {
		username: 'string',
		password: 'string'
	});

	input.requiredFields(['username', 'password']);

	if(!input.validate())
	{
		var missing = input.getInvalidFields().join(',');
		return self.throw(new MissingParamException(missing));
	}

	self.services['orm'].account_provider
	.create({
		account_id: self.account.id,
		provider_id: self.provider.id,
		username: input.getValue('username'),
		password: input.getValue('password')
	})
	.then(function(accountProvider)
	{
		res.jsonp(accountProvider);
	})
	.catch(function(err)
	{
		return self.throw(new InternalException(), err);
	});
};

/*
 * Get bitbucket test
 */
ProviderController.prototype.getResource = function(req, res)
{
	var self = this;

	self.services['orm'].account_provider
	.findOne({ where: {account_id: self.account.id, provider_id: self.provider.id} })
	.then(function(accountProvider)
	{
		return self.throw({data:'xxx'});
		res.jsonp(accountProvider);
	})
	.catch(function(err)
	{
		return self.throw(new InternalException(), err);
	});
};

module.exports = ProviderController;