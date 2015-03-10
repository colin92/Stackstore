'use strict';
var router = require('express').Router();
var async = require('async');
var Model = require('../../db/models/schemas');

router.use('/tutorial', require('./tutorial'));

// Initial routes setup
router.get('/products', function (req, res) {
  Model.Product.find().exec(function(err, products) {
    if (err) return res.json(err);
    res.send(products);
  });
});

router.get('/products/category/:category', function (req, res) {
  Model.Category.findOne({
    name: req.params.category
  }).exec(function(err, categoryObj) {
    if (err) return res.json(err);
    Model.Product.find({
      category: categoryObj._id
    }, function(err, products) {
      if (err) return res.json(err);
      res.json(products);
    });
  });
});

router.get('/categories', function (req, res) {
  Model.Category.find().exec(function(err, categories) {
    if (err) return res.json(err);
    res.send(categories);
  });
});

router.get('/:item', function (req, res) {
  Model.Product.findOne({title: req.params.item})
    .exec(function (err, product) {
      if (err) return res.json(err);
      res.send(product);
    });
});

// still working on this
router.post('/orders/:sessionId/add', function (req, res) {
  console.log(req.body);
    // if there is no existing order
    var newOrder = new Order({ sessionId: req.params.sessionId });

    // add item to order
    newOrder.items.push(req.body.item);
    newOrder.save();
    
});

// router.get('/orders/:sessionId', function(req, res) {
//   var sessionId = req.params.sessionId;
//   // console.log('sessionId', sessionId);
//   Model.Order.findOne({sessionId: sessionId}).exec(function(err, orders) {
//     // console.log('orders', orders);
//     async.map(orders.items, getProduct, function(err, products){
//       console.log('products', products);
//       if (err) return res.json(err);
//       res.send(products);
//     });

//   });
// });

// Review CRUD routes
router.post('/review/create', function(req, res) {
  if(!req.user) res.sendStatus(401).end(); 
  else {
    var review = new Model.Review(req.body.data);
    review.userId = req.user._id;
    review.save(function(err, review) {
      if(err) res.json(err);
      else res.json(review);
    });
  }
});

router.get('/reviews/:productid', function(req, res) {
  var productId = req.params.productid;
  Model.Review.find({productId: productId}, function(err, reviews) {
    if(err) res.json(err);
    else res.json(reviews);
  });
});

function getProduct(product, done) {
    Model.Product.findOne({_id: product._id}).exec(function(err, product) {
    console.log(product, product);
      done(err, product);
    });
}


module.exports = router;
