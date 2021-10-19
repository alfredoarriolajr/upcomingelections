var express = require('express');
var router = express.Router();
var postalAbbreviations = require('../us_state.js');
var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Find My Election', states: postalAbbreviations });
});

router.post('/search', function (req, res, next) {
  var state = req.body.state.toLowerCase();
  var city = req.body.city.toLowerCase().replace(' ', '_');
  var apiUrl = `https://api.turbovote.org/elections/upcoming?district-divisions=ocd-division/country:us/state:${state},ocd-division/country:us/state:${state}/place:${city}`
  request(apiUrl, {
    headers: {
      "Accept": "application/json"
    }
  }, function (err, response, body) {
    var results = JSON.parse(body);
    console.log(results);
    console.log('statusCode:', response && response.statusCode);
    res.render('search', {
      elections: results
    });
  });
});

module.exports = router;