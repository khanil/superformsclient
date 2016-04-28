var NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV == 'development') {
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

app.get("/signin", function(req, res) {
  res.sendFile(__dirname + '/dist/views/signIn.html');
});

app.get("/signup", function(req, res) {
  res.sendFile(__dirname + '/dist/views/signUp.html');
});

app.get("/generation", function(req, res) {
  res.sendFile(__dirname + '/dist/views/generation.html');
});

app.get("/report", function(req, res) {
  res.sendFile(__dirname + '/dist/views/report.html');
});

app.get("/interview", function(req, res) {
  res.sendFile(__dirname + '/dist/views/interview.html');
});

var FORMS_FILE = path.join(__dirname, 'forms.json');

app.get('/api/forms', function(req, res) {

  console.log('Get query to /api/forms.');

  fs.readFile(FORMS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var data = JSON.parse(data);

    var boilerplate = data[data.length-1];

    res.json(boilerplate);
    console.log('Send response from /api/forms:');
    console.log(boilerplate);
  });
});

app.post('/api/forms', function(req, res) {
  console.log(req.body);
  res.sendStatus(200);

  fs.readFile(FORMS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var boilerplate = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newBoilerplate = req.body;
    boilerplate.push(newBoilerplate);

    fs.writeFile(FORMS_FILE, JSON.stringify(boilerplate, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      // res.json(comments);
    });
  });
});

var ANSWERS_FILE = path.join(__dirname, 'answers.json');

app.post('/api/answers', function(req, res) {
  console.log(req.body);
  res.sendStatus(200);

  fs.readFile(ANSWERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newAnswer = req.body;
    comments.push(newAnswer);

    fs.writeFile(ANSWERS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      // res.json(comments);
    });
  });
});

var ANSWER_FILE = path.join(__dirname, 'answer.json');

app.get('/api/answers/form123', function(req, res) {

  console.log('Get query to /api/answers/form123.');

  fs.readFile(ANSWER_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var data = JSON.parse(data);

    res.json(data);
    console.log('Send response from /api/forms:');
    console.log(data);
  });
});


app.listen(port, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Listening on port " + port);
  }
});