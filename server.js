var NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV == 'dev') {
  console.log('DEVELOPMENT_MODE');
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var config = require('./webpack.config');
  var webpackHotMiddleware = require('webpack-hot-middleware');
} else {
  console.log('PRODUCTION_TEST_MODE');
}

var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var port = 4000;

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', __dirname + '/dist/views');

if (NODE_ENV == 'dev') {
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.path
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.listen(port, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Listening on port " + port);
  }
});