const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./server/config/index.json');

// connect to the database and load models
require('./server/models').connect(config.dbUri);


const app = express();

// set port
app.set('port', (process.env.PORT || 8000));

//use this directories
app.use(express.static('./public'))
app.use(express.static('./client/dist/'))

// parse HTTP messages
app.use(bodyParser.urlencoded({extended: false}));

// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


app.get("/*", function(req, res) {
res.sendFile(__dirname + '/public/index.html')
})

// server functionality
app.listen(app.get('port'), function () {
  console.log(`Server listening on port ${app.get('port')}`);
});
