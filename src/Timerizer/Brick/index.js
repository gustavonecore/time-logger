var fs = require("fs");
var path = require("path");
var walk = require(APPROOT + 'src/Libs/Walk');

walk(__dirname, function(err, results)
{
	if (err) throw err;

	for (var i in results)
	{
		tmp = results[i].replace(__dirname, '');
		file = tmp.substring(1, tmp.length);
		if (file != "index.js")
		{
			require(results[i]);
		}
	}
});