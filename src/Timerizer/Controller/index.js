var walk = require(APPROOT + 'src/Libs/Walk');
var AbstractRestController = require('./AbstractRestController');

module.exports = function(app)
{
	walk(__dirname, function(err, results)
	{
		if (err) throw err;

		var metafiles = [];

		for (var i in results)
		{
			tmp = results[i].replace(__dirname, '');
			file = tmp.substring(1, tmp.length);
			split = file.split('/');

			if (file != "index.js" && file != "AbstractRestController.js")
			{
				metafiles.push({
					deep: file.split('/').length - 1,
					fullpath: results[i],
					parentKey: file.lastIndexOf('/') ? file.substring(0, file.lastIndexOf('/')) : '',
					file: split[split.length -1],
					name: split[split.length -1].replace('.js', ''),
					key: file.replace('.js', '')
				});
			}
		}

		// Sort by deep
		metafiles = metafiles.sort(function(a, b) {
			var x = a['deep'];
			var y = b['deep'];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});

		//console.info(metafiles)
		var ControllersTree = {};

		for (var i = 0; i < metafiles.length; i++)
		{
			//console.info('loading: ' + metafiles[i].fullpath);

			var ControllerClass = require(metafiles[i].fullpath);
			var args = {
				express: app,
				parent: null
			};

			if (metafiles[i].deep > 0)
			{
				try
				{
					args['parent'] = metafiles[i].parentKey;
					//console.info('posee parent ' + args['parent']);
				}
				catch(e)
				{
					console.log('error', e);
					throw e;
				}
			}

			ControllersTree[metafiles[i].key] = new ControllerClass(args);
		};

		//console.log('ControllersTree ', ControllersTree);
	});
}