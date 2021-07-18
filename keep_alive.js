var http = require('http');

http.createServer(function (req, res) {
  res.write("I'm alive! \n(copy this URL into a service like UptimeRobot if you want to keep me running 24/7.)");
  res.end();
}).listen(8080);