const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// set port
app.set('port', (process.env.PORT || 8000));

//use this directories
app.use(express.static('./public'))
app.use(express.static('./client/dist/'))

// parse HTTP messages
app.use(bodyParser.urlencoded({extended: false}));

// routes
const authRoutes = require('./app_api/routes/auth');
app.use('/auth', authRoutes);


// server functionality
app.listen(app.get('port'), function () {
  console.log(`Server listening on port ${app.get('port')}`);
});
