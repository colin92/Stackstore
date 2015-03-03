'use strict';
var router = require('express').Router();
var Model = require('../../db/models/schemas');

router.use('/tutorial', require('./tutorial'));

// Initial routes setup
router.get('/products', function(req, res) {
	var searchQuery = {};
	if (req.query.category) {
		searchQuery = {category: req.query.category};	
	} 

	Model.Product.find(searchQuery, function(err, products){
		res.send(products);
	});
});


module.exports = router;