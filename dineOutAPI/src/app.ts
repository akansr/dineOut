import express = require('express');
import bodyParser = require('body-parser');
import http = require('http');

import restaurantsRouter = require('./RestaurantsRouter');
import usersRestaurantsRouter = require('./UsersRestaurantsRouter');

const app = express();
var port = process.env.PORT || '5000';
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
}

app.use(allowCrossDomain);

app.use('/restaurants', restaurantsRouter);
app.use('/users', usersRestaurantsRouter);



export default app;
