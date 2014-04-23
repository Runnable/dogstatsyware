var Dogstatsy = require('dogstatsy');

module.exports = createMiddleware;

function createMiddleware (opts) {
  var stats = new Dogstatsy(opts);
  return middleware;

  function middleware (req, res, next) {
    var reportTiming = stats.histogram('node.express.router');
    res.on('finish', sendStat);
    res.on('close', sendStat);
    return next();

    function sendStat () {
      res.removeListener('finish', sendStat);
      res.removeListener('close', sendStat);
      var routeName;

      if (req.route && req.route.path) {
        routeName = req.route.path;
        if (Object.prototype.toString.call(routeName) === '[object RegExp]') {
          routeName = routeName.source;
        }
      } else if (req.url) { // Required to pickup static routes
        routeName = req.url;
      }

      reportTiming({
        method: req.method,
        route: routeName,
        statusCode: res.statusCode
      });
    }
  }
}