var setCallback = require('dogstatsy/test/fixtures/DogStatsD');
var Dogstatsyware = require('..');
var request = require('supertest');
var express = require('express');
var app = express();

app.use(Dogstatsyware({
  service: 'dogstatsyware_test',
  port: 8126
}));

app.get('/test', function (req, res) {
  setTimeout(function () {
    res.send(200);
  }, 50);
});

describe('dogstatsyware', function () {

  it('should histogram', function (done) {
    var stat = 'node.express.router';
    setCallback(stat, '|h', function (err, stat, val, tags) {
      if (stat !== stat || val < 50 || val > 100 || tags.route !== '/test') {
        done(new Error('mismatch'));
      } else {
        done();
      }
    });
    request(app)
      .get('/test')
      .end(function () {});
  });

});