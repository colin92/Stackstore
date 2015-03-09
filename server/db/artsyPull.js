var artsySeed = function(findCategory) {
  var bluebird = require('bluebird'),
      request = bluebird.promisifyAll(require('request')),
      mongoose = require('mongoose'),
      async = require('async');

  var models = require('./models/schemas'); 
  var Product = mongoose.model('Product');

  var c = console.log.bind(console);

  var clientID = 'fae3c4fa1f1aaa38d79f',
      clientSecret = 'b79d97c8894488bf02d8b9e101c42fe5',
      apiUrl = 'https://api.artsy.net/api/tokens/xapp_token',
      xappToken;


  var xappToken = 'JvTPWe4WsQO-xqX6Bts49lgewdeFQIjV5ZTv5VKG07vASA9zKPD09uBmq19TAnYzhglL6svqqRICY_O4EjFCwN8LhdMuFL7vbG5993MQbkkSSfM5W-WOaNVG94M9aUiXlS4hpEBigTWOk2Kt6Qa00UykXDZDBhWX3beF6a2rgIMU2D6uca_A09ObZNtFOtS0jKolC5hcoeiGiC1lgpKuCtG2FkpnPC9wPe1z_xSuzxM=';

  request.getAsync({
      url: 'https://api.artsy.net/api/artworks?size=200',
      headers: {
          'X-Xapp-Token': xappToken,
          'Accept': 'application/vnd.artsy-v2+json'
      }
  }).spread(function (response, body) {

      var requestArtwork = function (link) {
          return request.getAsync({
              url: link,
              headers: {
                  'X-Xapp-Token': xappToken,
                  'Accept': 'application/vnd.artsy-v2+json'
              }
          });
      };

      var body = JSON.parse(body);
      var artworks = body._embedded.artworks;

      var artworkInfo = artworks.map(function (artwork) {
          return {
              title: artwork.title,
              category: findCategory(artwork.category),
              medium: artwork.medium,
              date: artwork.date,
              imageUrl: artwork._links.curies[0].href.replace('{rel}','larger.jpg'),
              thumbnailUrl: artwork._links.thumbnail.href
          };
      });

      var links = artworks.map(function (art) {
          return art._links.artists.href;
      }).map(requestArtwork);

      bluebird.all(links).then(function (responses) {

          var parseBody = function (response) {
              var bodyString = response[1];
              return JSON.parse(bodyString);
          };

          var artists = responses.map(parseBody).map(function (response) {
              var artist = response._embedded.artists[0];
              var artistInfo;
              if (artist) {
                  artistInfo = {
                      name: artist.name,
                      nationality: artist.nationality};
                  } else {
                      artistInfo = {
                      name: 'Unknown',
                      nationality: ''};
              }
              return artistInfo;
          });

          artworkInfo.forEach(function (artwork, index) {
              artwork.artistName = artists[index].name;
              artwork.artistNationality = artists[index].nationality;
          });

          // Seeding

          var dataForDB = {
              Product: artworkInfo
          };

          console.log(dataForDB);

          async.each(Object.keys(dataForDB),
              function(modelName, outerDone) {
                  async.each(dataForDB[modelName],
                      function(d, innerDone) {
                          models[modelName].create(d, innerDone);
                      },
                      outerDone
                  );
              },
              function(err) {
                  console.log("Finished inserting artsy data");
              }
          );





      });

  });
}
module.exports = artsySeed;
