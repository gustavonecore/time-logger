var BrickNotFoundError = require("./Error/BrickNotFoundError");
var InvalidCallbackError = require("./Error/InvalidCallbackError");

var LegoBricks = {};
var CacheBricks = {};

function Builder()
{
}

Builder.prototype = {
	/**
	 * @var Object container
	 */
	container: null,

	setContainer: function(container){
		this.container = container;
	},

	process: function(name, params, next)
	{
		if (!next)
		{
			throw new InvalidCallbackError();
		}

		name += 'Brick';

		var brick = name.charAt(0).toUpperCase() + name.slice(1);

		if (LegoBricks[brick])
		{
			var brickInstance = null;

			if (CacheBricks[brick])
			{
				brickInstance = CacheBricks[brick];
				console.log('Get from cache Brick: ' + brick);
			}
			else
			{
				console.log('Brick creating: ' + brick);
				brickInstance = LegoBricks[brick].fromContainer(this.container);
				CacheBricks[brick] = brickInstance;
			}

			brickInstance.exe(params, function(err, response)
			{
				if (err)
				{
					next(err);
					return;
				}
				else
				{
					next(null, response);
				}
			});
		}
		else
		{
			next(new BrickNotFoundError(brick));
		}
	}
}

Builder.registerBrick = function(name, brickClass)
{
	if (!brickClass.fromContainer)
	{
		throw 'You must define the static factory method [fromContainer]';
	}

	LegoBricks[name] = brickClass;
}

module.exports = Builder;