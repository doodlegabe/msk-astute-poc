"use strict";

var express = require('express');

var logger = require('morgan');

var favicon = require('serve-favicon');

var bodyParser = require('body-parser');

var path = require('path');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(favicon(path.join(__dirname, '', 'favicon.ico')));

require('../server/routes')(app);

app.get('*', function (req, res) {
  return res.status(200).send({
    message: 'Unknown route.'
  });
});
module.exports = app;