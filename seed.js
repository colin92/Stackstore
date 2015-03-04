var mongoose = require('mongoose');
var	async = require('async'),
	models = require('./server/db/models/schemas.js');

var path = require('path');

var DATABASE_URI = require(path.join(__dirname, 'server/env')).DATABASE_URI;

var db = mongoose.connect(DATABASE_URI).connection;


var catData = {
	Category: [
		{name: 'African Art'},
		{name: 'Feminist Art'},
		{name: 'Chinese Art'},
		{name: 'Color Fields'},
		{name: 'Emerging Art'},
		{name: 'Figurative Painting'},
		{name: 'Portrait Photography'},
		{name: 'Contemporary Pop'},
		{name: 'Ceramics'},
		{name: 'Art Nouveau'},
		{name: 'Bauhaus'},
		{name: 'Post-War American Art'},
		{name: 'Post-War European Art'},
		{name: 'Renaissance'},
		{name: 'Greek and Roman Art and Architecture'},
		{name: 'Arts of Africa, Oceania, and the Americas'},
		{name: 'Minimalism'},
		{name: 'Impressionism'}
	]
};

var otherData = {
	Product: [
		{
			title: 'Jeff Koons',
			description: 'Balloon Dog (Yellow), 1994-2000',
			price: 10000,
			category: 'African Art',
			imageUrl: 'http://lorempixel.com/400/400'  
		},
		{
			title: 'Damien Hirst',
			description: 'Away from the Flock, 1994',
			price: 5000,
			category: 'Chinese Art',
			imageUrl:'http://lorempixel.com/400/400'		
		},
		{
			title: 'Jeff Koons',
			description: 'Michael Jackson and Bubbles, 1988',
			price: 1000,
			category: 'Color Fields',
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

        async.waterfall([
        	loadingCategories,
        	getCategories,
        	loadingOtherData,
    	], function (err, result) {
    		if (err) console.log(err);
    		process.exit();
    	});

	    function loadingCategories(callback) {
	        var data = catData;
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
	                console.log("Finished inserting category data");
	            }
	        );
	        callback(null);
	    };


    	function getCategories(callback) {
    		models.Category.find().exec(function(err, categories) {
    			callback(null, categories)
    		})
    	};


	    function loadingOtherData(categories, callback) {
	        var data = otherData;
	        async.each(Object.keys(data),
	            function(modelName, outerDone) {
	                async.each(data[modelName],
	                    function(d, innerDone) {
	                    	if (d.category) {
	                    		for (var i = 0; i < categories.length; i++) {
	                    			if (d.category === categories[i].name) {
	                    				d.category = categories[i]._id;
	                    				break;
	                    			}
	                    		}
	                    	}
	                        models[modelName].create(d, innerDone);
	                    },
	                    outerDone
	                );
	            },
	            function(err) {
	                console.log("Finished inserting remaining data");
	                console.log("Control-C to quit");
	            }
	        );
	        callback(null);
	    };



    });
});