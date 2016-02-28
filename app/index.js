require('../config/globals');

var Sequelize = require('sequelize');
var cors = require('cors');
var express = require("express");
var expressApp = express();
var http = require("http");
var server = http.createServer(expressApp);
var LegoBuilder = require(APPROOT + 'src/Lego/Builder');

var builder = new LegoBuilder();
var models = require(APPROOT + "src/Timerizer/Model");
var port = 3000;

var container = {};

expressApp.use(cors());

expressApp.configure(function () {
	expressApp.use(express.bodyParser());
	expressApp.use(express.methodOverride());
});

expressApp.use(function(err, req, res, next) {
	console.log('something goes worng');
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

process.on('uncaughtException', function(err){
  console.log("Caught exception: ${err}");
});

models
.sequelize
.sync({syncOnAssociation: false, force: false})
.then(function ()
{
	container = {
		db: models.sequelize,
		orm: models,
		builder: builder
	};

	builder.setContainer(container);

	expressApp.services = container;

	// Load dependencies
	require(APPROOT + "src/Timerizer/Controller")(expressApp);
	require(APPROOT + "src/Timerizer/Exception");
	require(APPROOT + "src/Timerizer/Brick");

	//Start server
	server.listen(port, function() {
		console.log("Node server running on http://localhost:"+port);
	});
});
