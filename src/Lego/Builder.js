var BrickNotFoundError = require("./Error/BrickNotFoundError");
var InvalidCallbackError = require("./Error/InvalidCallbackError");

var LegoBricks = {};

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

	/**
	 * Shortcut to call command execution.
	 *
	 * @param string $name     Command Name
	 * @param array  $params   Params needed by the command
	 *
	 * @return callback
	 */

	process: function(name, params, next)
	{
		if (!next)
		{
			throw new InvalidCallbackError();
			return;
		}

		name += 'Brick';

		var brick = name.charAt(0).toUpperCase() + name.slice(1);

		if (LegoBricks[brick])
		{
			var brickInstance = LegoBricks[brick].fromContainer(this.container);
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

Builder.registerBrick = function(name, brickClass){
	LegoBricks[name] = brickClass;
}

module.exports = Builder;