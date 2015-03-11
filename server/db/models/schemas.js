var mongoose = require('mongoose'),
	user = require('./user');


var productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	category: String, //{type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
	medium: String,
  artistName: String,
  artistNationality: String,
	date: String,
	imageUrl: String,
	thumbnailUrl: String,
	price: Number
});


var orderSchema = new mongoose.Schema({
	// Needs to either have a user OR session
	userId: String,
	items: [{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		},
		quantity: Number,
		price: Number
	}]
});

var categorySchema = new mongoose.Schema({
	// for each product
	name: {
		type: String,
		required: true
	}
});


var reviewSchema = new mongoose.Schema({
	title: String,
	body: {type: String, required: true, min: 10},
  date: {type: Date, default: Date.now() },
	stars: {type: Number, default: Math.floor( Math.random() * 5 + 1) },
	productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = {
	Product: mongoose.model('Product', productSchema),
	Order: mongoose.model('Order', orderSchema),
	Review: mongoose.model('Review', reviewSchema),
	Category: mongoose.model('Category', categorySchema),
	User: user
};
