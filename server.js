var NODE_ENV = process.env.NODE_ENV;

//Ololl

if (NODE_ENV == 'development') {
  console.log('DEVELOPMENT_MODE');
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var config = require('./webpack.config');
  var webpackHotMiddleware = require('webpack-hot-middleware');
} else {
  console.log('PRODUCTION_TEST_MODE');
}

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var port = 3000;

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', __dirname + '/dist/views');

if (NODE_ENV == 'development') {
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  /* 
   * сервер теперь принимает уведомления, когда главный js скрипт собран 
   * и вызывает обновления модулей нашего приложения
   */
  app.use(webpackHotMiddleware(compiler));
}

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/dist/views/index.html');
});

app.post('/api/comments', function(req, res) {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(port, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Listening on port " + port);
  }
});