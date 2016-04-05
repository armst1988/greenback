var express = require('express');
var app = express();
var cheerio = require('cheerio');
var httpRequest = require('request');

app.get('/parse', function(request, response) {
  if (request.param('html').indexOf('http') == 0)
  {
    httpRequest({ url: request.param('html') }, function(error, resp, body) {
      response.send(parseData(body));
    });
  }
  else {
    response.send(parseData(request.param('html')));
  }
});

app.get('/', function(request, response) {
  response.send('<html><body><form action="parse">HTML Code or URL<input type="text" name="html" /><input type="submit" value="submit" /></form></body></html>')
});

app.listen(8090, function() {
  console.log("listening port 8090");
});

function parseData(html, callback) {
  var $ = cheerio.load(html);
  var pairs = {};
  pairs.capitals = [];
  pairs.summary = {};
  $('li').each(function(i, element) {
    var capital = $(this).children('.capital').text().trim();
    var state = $(this).children('.state').text().trim();
    pairs.capitals.push({ 'capital' : capital, 'state' : state })
    pairs.summary.numberOfCapitals = pairs.capitals.length;
  });
  return JSON.stringify(pairs);
}
