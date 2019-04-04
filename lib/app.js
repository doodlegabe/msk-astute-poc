const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, '', 'favicon.ico')));

require('../server/routes')(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Unknown route.',
}));

module.exports = app;