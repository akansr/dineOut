import createError = require('http-errors');
import express = require('express');
import bodyParser = require('body-parser');
import http = require('http');
import analyzerRouter = require('./AnalyzerRouter');

const app = express();
var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);

server.listen(port);

server.on('listening', onListening);
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

app.use(allowCrossDomain);

app.use('/polarity', analyzerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
