var mongoose = require('mongoose');
var	async = require('async'),
	models = require('./server/db/models/schemas.js'),
	_ = require('lodash');

var path = require('path');

var DATABASE_URI = require(path.join(__dirname, 'server/env')).DATABASE_URI;

var db = mongoose.connect(DATABASE_URI).connection;

var artistData = [{name: 'Paul Klee'}, {name: 'Jeff Koons'}, {name: 'Damien Hirst'}]

var catData = [
	{name: 'African Art'},
	{name: 'Feminist Art'},
	{name: 'Chinese Art'},
	{name: 'Minimalism'},
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
	{name: 'Impressionism'}
]

var userData = [
	{
		email: 'vincent@daranyi.com',
		password: 'qwerty'
	}
]

var otherData = [{
	Product: [
		{
			title: 'Balloon Dog (Yellow), 1994-2000',
			artistId: '1',
			description: 'Sed ornare accumsan velit eu vulputate. Phasellus tempor consectetur metus ac gravida. Donec condimentum lacus diam, ut tristique neque rhoncus vel. Praesent pretium mauris pharetra nisl hendrerit, nec hendrerit ipsum sagittis. Nam vitae sapien at ipsum vestibulum scelerisque. Morbi egestas, enim a pulvinar accumsan, lacus arcu mollis justo, eget facilisis elit mauris sed est. Pellentesque gravida bibendum nisi, id blandit arcu molestie ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus elementum efficitur tortor, id scelerisque quam varius nec. Pellentesque faucibus justo eget dui ultrices, ut gravida mi rhoncus. Ut vel neque at dolor pulvinar rhoncus in vulputate lacus. Praesent in dapibus nisl. Quisque lectus dui, molestie sed aliquam sit amet, euismod et nibh.',
			price: 10000,
			categoryId: '0',
			imageUrl: 'http://lorempixel.com/400/400'  
		},
		{
			title: 'Away from the Flock, 1994',
			artistId: '2',
			description: 'In tempor ornare hendrerit. Pellentesque ultrices, quam nec fermentum porta, nisl risus tincidunt leo, vitae consequat ante augue ut enim. Nam eget est lacus. Mauris rhoncus tempus augue, ut placerat magna. Sed commodo dapibus libero, at accumsan massa. Vivamus consequat fermentum sem, at auctor nulla condimentum quis. Phasellus tellus risus, ultrices at massa eu, vulputate accumsan orci. Phasellus sodales ipsum at tellus tempus, id accumsan tellus ornare. Praesent augue arcu, pretium suscipit lacus ut, vehicula vehicula odio. Etiam porttitor rhoncus erat, ac ullamcorper est iaculis quis. Quisque in ante libero. Etiam et libero convallis, convallis metus accumsan, consequat nisi. Ut dignissim eget mi at feugiat. Sed malesuada sit amet augue et fringilla. In lorem odio, pretium pellentesque venenatis et, bibendum eu sem. Morbi iaculis nisi id sagittis suscipit.',
			price: 5000,
			categoryId: '1',
			imageUrl:'http://lorempixel.com/400/400'		
		},
		{
			title: 'Michael Jackson and Bubbles, 1988',
			artistId: '1',
			description: 'Proin elit leo, facilisis in quam imperdiet, pulvinar rutrum nulla. Cras quis purus convallis, semper leo sed, malesuada augue. Maecenas aliquam sagittis nisl, sed condimentum enim molestie a. Mauris venenatis interdum placerat. Nulla non velit congue, commodo massa nec, feugiat leo. Aliquam eu leo posuere, egestas lorem ac, facilisis sapien. Donec dictum id magna a fringilla. In sem libero, tempor rutrum luctus vel, posuere eu ligula. Nulla nulla tortor, blandit ac diam a, laoreet tempus nisl. Nam convallis tincidunt lectus id rutrum. In vitae eros neque. Mauris vitae rutrum diam. Vivamus sit amet faucibus metus. Phasellus cursus, tortor nec suscipit aliquet, lorem arcu porttitor dolor, sit amet dictum nisl dui ac lacus. Aliquam fermentum erat dui, dapibus ultricies odio porttitor eu.',
			price: 1000,
			categoryId: '2',
			imageUrl:'http://lorempixel.com/400/400'
		},
		{
			title: 'Twittering Machine, 1922',
			artistId: '0',
			description: 'Proin non commodo lacus. Cras sem magna, sagittis nec porttitor a, faucibus id turpis. Pellentesque varius tellus neque, at molestie ex rhoncus eleifend. In eget augue lorem. In elementum erat eget leo dapibus scelerisque. Vivamus id bibendum velit, vitae posuere nibh. Praesent feugiat dolor elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sodales tellus nibh, et vehicula erat luctus eu. Nunc lacinia augue quis fringilla luctus. Quisque interdum elit at neque lacinia efficitur. Pellentesque sollicitudin elementum turpis, eu semper nisl tristique aliquam. Praesent varius et sapien at pharetra. Pellentesque tempus maximus massa sed cursus. In ut euismod leo.',
			price: 50000,
			categoryId: '3',
			imageUrl:'http://lorempixel.com/400/400'
		}
	]},
	{ Review: [
		{
			title: 'Beautiful',
			body: '... but too expensive for me',
			stars: 5, 
			productId: '3',
			userId: '0' 

		}
	]},
	{ Order: [
		{
			userId: '0',
			items: [{
				productId: '2',
				quantity: 1,
				price: 5000
			}]
		}
	]}
];



mongoose.connection.on('open', function() {
    mongoose.connection.db.dropDatabase(function() {        
        console.log("Dropped old data, now inserting data");

        async.waterfall([
        	loadingIndependentModels,
        	loadingDependentData,
    	], function (err, result) {
    		if (err) console.log(err);
    		// process.exit();
    	});

    	function loadingIndependentModels(callback) {
	        var data = {
	        	artistId: [], 
	        	categoryId: [],
	        	userId: []
	        };

	        async.each(artistData,
	            function(artist, done) {
	                models.Artist.create(artist).then(function(newArtist) {
	                	data.artistId.push(newArtist);
	                	done();
	                });
	            },
	            function(err) {
	                console.log("Finished inserting artist data");
	            }
	        );

	        async.each(catData,
	            function(category, done) {
	            	models.Category.create(category).then(function(newCategory) {
	                	data.categoryId.push(newCategory);
	                	done();
	                });
	            },
	            function(err) {
	                console.log("Finished inserting category data");
	            }
	        );

	        async.each(userData,
	            function(individual, done) {
	            	models.User.create(individual).then(function(newUser) {
	                	data.userId.push(newUser);
	                	done();
	                });
	            },
	            function(err) {
	                console.log("Finished inserting user data");
	            }
	        );
	        setTimeout(function() {
	        	callback(null, data);
	        }, 3000);
	    };

	    function loadingDependentData(data, callback) {
	    	// otherData keys should be in order of dependency, 
	    	// so products before product reviews, etc.
	        otherData.forEach(function(modelArr) {
	        	modelName = Object.keys(modelArr)[0];
	        	data[modelName.toLowerCase() + 'Id'] = [];
                async.each(modelArr[modelName],
					function(newModelObj, cb) {

						// Get all keys that end in Id (i.e. artistId)
						var ids = _.filter(Object.keys(newModelObj), function(key) {
							return key.match(/.*Id/);
						});
						// Iterate over all Id fields
						ids.forEach(function(id) {
							// Replace contents of field with Id of respective object
							if(newModelObj[id]) newModelObj[id] = data[id][newModelObj[id]]._id;
						});

                        models[modelName].create(newModelObj, function(err, obj) {
                        	console.log("err", err);

                        	console.log(obj);
                        	data[modelName.toLowerCase() + 'Id'].push(obj);
                        	
                        	cb();
                        });
                    },
					function(err) {
		                console.log("Finished inserting remaining data");
		                console.log("Control-C to quit");
	            	}
                );
            });
	        callback(null);
	    };



    });
});