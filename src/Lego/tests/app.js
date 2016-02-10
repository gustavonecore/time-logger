var Builder = require('../Builder.js');
var SampleBrickLoad = require('./SampleBrick');
var SampleAsyncBrickLoad = require('./SampleAsyncBrick');

var builder = new Builder();

var container = {
	db: {
		query: function(data, next)
		{
			setTimeout(function(){ next({error:true}, null) }, 2000);
		}
	},
	orm: function(){
		console.log('Database service');
	},
	builder: builder
};

builder.setContainer(container);

/*
// Good call
builder.process('sample', {
	data1:1
},
function(err, response){
	if (err)
	{
		console.log(err);
	}
	else{
		console.log('Response: ', response);
	}
});

// Good call , but the brick has special validation
builder.process('sample', {invalid:true},
	function(err, response){
		if (err)
		{
			console.log(err);
		}
		else{
			console.log('Response: ', response);
		}
	}
);

// Bad call next invalid
builder.process('sample', {
	data1:1,
	data2:2,
	data3:3});
*/
// Good call
builder.process('sampleAsync', {
	data1:1
},
function(err, response){
	if (err)
	{
		//console.log(err);
	}
	else{
		console.log('Response: ', response);
	}
});

console.log('finished call');