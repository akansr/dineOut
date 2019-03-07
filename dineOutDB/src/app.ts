import express = require('express');
import bodyParser = require('body-parser');
import http = require('http');

import userLoginRouter = require('./routes/UserLoginRouter');
import registerRouter = require('./routes/UserRegisterRouter');
import userRouter = require('./routes/UserHistoryRouter');
import restaurantRouter = require('./routes/RestaurantRouter');
const app = express();
//app.set('port', port);


const db = require('./models');


//var server = http.createServer(app);

//server.listen(port);

// server.on('listening', onListening);
// function onListening() {
//     var addr = server.address();
//     var bind = typeof addr === 'string'
//         ? 'pipe ' + addr
//         : 'port ' + addr.port;
//     console.log('Listening on ' + bind);
// }

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

app.use('/login', userLoginRouter);
app.use('/register', registerRouter);
app.use('/users', userRouter);
app.use('/restaurants', restaurantRouter);

// Start web server at port 4000
db.sequelize.sync().then(function () {

    var port = process.env.PORT || '4000';
    var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Server start at http://%s:%s', host, port);
    });
});
export default app;
