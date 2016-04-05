var cheerio = require('cheerio');

var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Greenback.com</title><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content=""><meta name="author" content=""></head><body><div id=\'main\'><ul><li><strong class=\'capital\'>Lansing</strong><span class=\'state\'>Michigan  </span></li> <li><strong class=\'capital\'>Sacramento</strong><span class=\'state\'>       California</span></li></ul></div></body></html>';
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

console.log("JSON: " + JSON.stringify(pairs));
