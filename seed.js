var mongoose = require('mongoose');
var async = require('async'),
  models = require('./server/db/models/schemas.js');

var _ = require('lodash');

var path = require('path');

var artsyPull = require('./server/db/artsyPull.js');

var DATABASE_URI = require(path.join(__dirname, 'server/env')).DATABASE_URI;

var db = mongoose.connect(DATABASE_URI).connection;

var catData = {
  Category: [{
    name: 'Sculpture'
  }, {
    name: 'Works on Paper'
  }, {
    name: 'Photography'
  }, {
    name: 'Design/Decorative Art'
  }, {
    name: 'Artifact/Functional Object'
  }, {
    name: 'Painting'
  }]
};

var otherData = {
  // Product: [{
  //   title: 'Jeff Koons',
  //   description: 'Balloon Dog (Yellow), 1994-2000',
  //   price: 10000,
  //   category: 'African Art',
  //   imageUrl: 'http://www.nova68.com/Merchant2/graphics/00000001/modern-bookend-balloon-shape-dog.jpg'
  // }, {
  //   title: 'Damien Hirst',
  //   description: 'Away from the Flock, 1994',
  //   price: 5000,
  //   category: 'Chinese Art',
  //   imageUrl: 'http://lorempixel.com/400/400'
  // }, {
  //   title: 'Jeff Koons',
  //   description: 'Michael Jackson and Bubbles, 1988',
  //   price: 1000,
  //   category: 'Color Fields',
  //   imageUrl: 'http://lorempixel.com/400/400'
  // }],
  Review: [{
    title: 'Beautiful',
    body: '... but too expensive for me',
    stars: 5,
    productId: '54f4d703416cb0d13f29fd3c',
    userId: '54f4d703416cb0d13f29fd3c'

  }],
  Order: [{
    userId: '54f4d703416cb0d13f29fd3c',
    sessionId: 'Something',
    items: [{
      productId: '54f4d703416cb0d13f29fd3c',
      quantity: 1,
      price: 5000
    }]
  }],
  User: [{
    email: 'vincent@daranyi.com',
    password: 'hello'
  }]
};



mongoose.connection.on('open', function() {

  mongoose.connection.db.dropDatabase(function() {
    console.log("Dropped old data, now inserting data");

    async.waterfall([
      loadingCategories,
      getCategories,
      loadingOtherData,
      artsySeed
    ], function(err, result) {
      if (err) console.log(err);
      console.log('finished, press Control-C to quit.');
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
          // process.exit();
        }
      );
      setTimeout(function() {
        callback(null, categories);
      }, 200);
    };

    function artsySeed(categories, callback) {
      var findCategory = function findCategory(cat) {
        var foundCat = _.find(categories, function(currCategory, index, arr) {
          if(cat === 'Work on Paper' && currCategory.name === 'Works on Paper') return true;
          return cat === currCategory.name;   
        });
        if(!foundCat) {
          foundCat = new models.Category({name: cat});
          foundCat.save;
        }
        return foundCat._id;
      }
      artsyPull(findCategory);
      callback(null);
    }


  });
});
