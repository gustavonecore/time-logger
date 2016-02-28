var AbstractRestController = require(APPROOT + "src/Timerizer/Controller/AbstractRestController");
var Filter = require(APPROOT + "src/Libs/Filter/Filter");

var TaskPoolController  = function(options)
{
	this.resourceName = 'task-pool';
	AbstractRestController.call(this, options);
}

require('util').inherits(TaskPoolController , AbstractRestController);

TaskPoolController.prototype.account = null;
TaskPoolController.prototype.task = null;

TaskPoolController.prototype.before = function(req, res, next)
{
	var self = this;

	if (!req.params || !req.params.account_id)
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

		if (req.params.task_id)
		{
			// Get the task
			self.services['builder'].process('getTaskById',
			{
				id: req.params.task_id
			},
			function(err, response)
			{
				if (err)
				{
					return self.throw(new InternalException(), err);
				}

				if (!response.task)
				{
					return self.throw(new ResourceNotFoundException('Task with uuid ' + req.params.task_id));
				}

				self.task = response.task;

				next();
			});
		}
		else
		{
			next();
		}
	});
};

/*
 * Get bitbucket test
 */
TaskPoolController.prototype.getCollection = function(req, res)
{
	var self = this;

	JiraApi = require('jira').JiraApi;
	var jira = new JiraApi('https', 'digitalintent.atlassian.net', 443, 'gustavod@digintent.com', 'califragilistico', '2');

	self.services['db'].query('SELECT p.* FROM provider p, account_provider ap WHERE p.id = ap.provider_id AND ap.account_id = :account_id',
	{
		replacements: {
			account_id: self.account.id
		},
		type: 'SELECT'
	})
	.then(function(providers)
	{
		jira.findIssue('SMAR-155', function(error, issue)
		{
			console.log('error: ' + error);
			console.log('Status: ' + issue);
		});

		res.jsonp(providers);
	})
	.catch(function(err)
	{
		return self.throw(new InternalException(), err);
	});
};

module.exports = TaskPoolController;