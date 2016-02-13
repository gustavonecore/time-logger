var fs = require("fs");
var path = require("path");

fs.readdirSync(__dirname)
.filter(function(file)
{
	return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "ApiException.js");
})
.forEach(function(file)
{
	global[file.replace('.js', '')] = require(path.join(__dirname, file));
});