var mongoose = require('mongoose'),
	user = require('./user');
mongoose.connect('mongodb://localhost/stackstore');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
	

var productSchema = new mongoose.Schema({
	title: {type: String, required: true, unique: true},
	description: String,
	price: Number,
	category: {type: String, required: true},
	imageUrl: {type: String}
	// What type should photo be?
});


var orderSchema = new mongoose.Schema({
	// Needs to either have a user OR session
	userId: String,
	sessionId: String,
	items: [{productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
			quantity: Number,
			price: Number}]
});


var reviewSchema = new mongoose.Schema({
	title: String,
	body: {type: String, required: true, min: 10},
	stars: Number, 
	productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = {
	Product: mongoose.model('Product', productSchema),
	Order: mongoose.model('Order', orderSchema),
	Review: mongoose.model('Review', reviewSchema),
	User: user
};

console.log('Done!');