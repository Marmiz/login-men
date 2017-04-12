const path = require('path');

module.exports = {
  // entry for the bundle
  entry: path.join(__dirname, 'client','src','index.js'),

  // bundle to
  output: {
    path: path.join(__dirname, 'client', 'dist', 'js'),
    filename: 'app.js'
  },

  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'client','src'),
      },
    ]
  },


watch: true
};
