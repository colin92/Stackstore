var mongoose = require('mongoose');
var	async = require('async'),
	models = require('./server/db/models/schemas.js');

var path = require('path');

var DATABASE_URI = require(path.join(__dirname, 'server/env')).DATABASE_URI;

var db = mongoose.connect(DATABASE_URI).connection;


var data = {
	Product: [
		{
			title: 'Jeff Koons',
			description: 'Balloon Dog (Yellow), 1994-2000',
			price: 10000,
			category: 'Contemporary',
			imageUrl: 'http://lorempixel.com/400/400'  
		},
		{
			title: 'Damien Hirst',
			description: 'Away from the Flock, 1994',
			price: 5000,
			category: 'Contemporary',
			imageUrl:'http://lorempixel.com/400/400'		
		},
		{
			title: 'Jeff Koons',
			description: 'Michael Jackson and Bubbles, 1988',
			price: 1000,
			category: 'Contemporary',
			imageUrl:'http://lorempixel.com/400/400'
		}
	],
	Review: [
		{
			title: 'Beautiful',
			body: '... but too expensive for me',
			stars: 5, 
			productId: '54f4d703416cb0d13f29fd3c',
			userId: '54f4d703416cb0d13f29fd3c' 

		}
	],
	Order: [
		{
			userId: '54f4d703416cb0d13f29fd3c',
			sessionId: 'Something',
			items: [{
				productId: '54f4d703416cb0d13f29fd3c',
				quantity: 1,
				price: 5000
			}]
		}
	],
	User: [
		{
			email: 'vincent@daranyi.com'
		}
	]
};



mongoose.connection.on('open', function() {
    mongoose.connection.db.dropDatabase(function() {
        
        console.log("Dropped old data, now inserting data");
        async.each(Object.keys(data),
            function(modelName, outerDone) {
                async.each(data[modelName],
                    function(d, innerDone) {
                        models[modelName].create(d, innerDone);
                    },
                    outerDone
                );
            },
            function(err) {
                console.log("Finished inserting data");
                console.log("Control-C to quit");
            }
        );
    });
});