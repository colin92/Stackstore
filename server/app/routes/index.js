'use strict';
var router = require('express').Router();
var Model = require('../../db/models/schemas');

router.use('/tutorial', require('./tutorial'));

// Initial routes setup
router.get('/category/:cat', function(req, res) {
	var category = req.params.cat;
	console.log(category);
	
	Model.Product.find({category: category}, function(err, products){
		res.send(products);
	});
});


module.exports = router;