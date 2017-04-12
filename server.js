const express = require('express');
const app = express();

// set port
app.set('port', (process.env.PORT || 8000));

//use this directories
app.use(express.static('./public'))
app.use(express.static('./client/dist/'))


// server functionality
app.listen(app.get('port'), function () {
  console.log(`Server listening on port ${app.get('port')}`);
});
