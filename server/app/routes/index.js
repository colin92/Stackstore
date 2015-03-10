'use strict';
var router = require('express').Router();
var async = require('async');
var Model = require('../../db/models/schemas');

router.use('/tutorial', require('./tutorial'));

// Initial routes setup
router.get('/products', function(req, res) {
  Model.Product.find().exec(function(err, products) {
    if (err) return res.json(err);
    res.send(products);
  });
});

router.get('/products/category/:category', function(req, res) {
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

router.get('/categories', function(req, res) {
  Model.Category.find().exec(function(err, categories) {
    if (err) return res.json(err);
    res.send(categories);
  });
});

router.get('/:item', function(req, res) {
  Model.Product.findOne({
      title: req.params.item
    })
    .exec(function(err, product) {
      if (err) return res.json(err);
      res.send(product);
    });
});

// checks to see if order exists, and accordingly adds item to order in database
router.post('/orders/add', function(req, res) {
  // if there is no existing order
  Model.Order.findOne({
    userId: req.user._id
  }).exec(function(err, order) {
    if (err) return res.json(err);
    console.log("this is the returned order", order);
    if (order) {
      console.log("order exists, pushing this directly into order: ", req.body.data);
      order.items.push({
        productId: req.body.data._id,
        quantity: 1,
        price: req.body.data.price
      });
      order.save(function(err, savedOrder) {
        console.log("the order was updated to look like this: ", savedOrder);
      });
    } else if (order === null) { // when the order does not exist
      console.log("order does not exist, adding item: ", req.body.data);
      var newOrder = new Model.Order({
        userId: req.user._id
      });
      // add item to order
      newOrder.items.push({
        productId: req.body.data._id,
        quantity: 1,
        price: req.body.data.price
      });
      newOrder.save(function(err, savedOrder) {
        if (err) return res.json(err);
        console.log("the item added to order was updated it to look like this: ", savedOrder);
      });
    }
  });
});

// sends cart info from cookies to 'order' db when user logs in
router.post('/orders/send', function(req, res) {
  var cookieCartItems = req.body.data;

  Model.Order.findOne({
    userId: req.user._id
  }).exec(function(err, order) {
    if (err) return res.json(err);
    // console.log("this is the returned order we found", order);
    if (order) {
      console.log("order exists, pushing cart items array into order: ");
      cookieCartItems.forEach(function(thing) {
        order.items.push({
          productId: thing._id,
          quantity: 1,
          price: thing.price
        });
      });

      order.save(function(err, savedOrder) {
        if (err) return res.json(err);
        console.log("the order was updated to look like this: ", savedOrder);
      });
    } else if (order === null) { // when the order does not exist
      console.log("order does not exist, adding items array to a new order: ", req.body.data);
      var newOrder = new Model.Order({
        userId: req.user._id
      });

      cookieCartItems.forEach(function(thing) {
        newOrder.items.push({
          productId: thing._id,
          quantity: 1,
          price: thing.price
        });
      });

      // add item to order
      newOrder.save();
    }
  });
});


function getProduct(product, done) {
  Model.Product.findOne({
    _id: product._id
  }).exec(function(err, product) {
    console.log(product, product);
    done(err, product);
  });
}


module.exports = router;