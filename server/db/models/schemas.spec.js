'use strict';
var mongoose = require('mongoose'),
	chai = require('chai'),
	expect = chai.expect;

require('../index.js');
require('./schemas');
var Product = mongoose.model('Product'),
	Category = mongoose.model('Category');

describe('Product model', function() {
	// before(function(done) {
	// 	dbconnection.then(function(){
	// 		done();
	// 	})
	// });

	var product;
	var categoryId;
	before(function(done) {
		Category.findOne({name: 'Chinese Art'}, function(err, category){
			categoryId = category._id;
			Product.create({
				title: 'My newest piece',
				description: 'Painting',
				price: 5000,
				category: categoryId
			}, function(err, createdProduct){
				product = createdProduct;
				done();
			});
		});
	});

	describe('correctly', function(){
		var testProduct;
		before(function(done){
			Product.findOne({title: 'My newest piece'}, function(err, foundProduct){
				testProduct = foundProduct;
				done();
			});
		});

		it('saves product to the database', function(){
			// Product.find({title: 'My newest piece'}, function(foundProduct){
				expect(testProduct.description).to.equal('Painting');
				// testProduct = foundProduct
			// });
		});

		it('allocates category ObjectId to the product', function(){
			Category.findOne({_id: testProduct.category}, function(err, foundCat){
				expect(foundCat.name).to.equal('Chinese Art');
			});
		});

	describe('does not allow', function() {
		it('to save product without title', function() {
			Product.create({
				description: 'This shouldnt work'
			}, function(err, createdProduct){
				expect(err).not.to.be.null;
			});
		});

		it('to save product without category', function() {
			Product.create({
				title: 'This shouldnt work',
				description: 'This shouldnt work'
			}, function(err, createdProduct){
				expect(err).not.to.be.null;
			});
		});

	});


	});
});





