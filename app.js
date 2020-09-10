const express = require('express');
const createError = require('http-errors');
const logger = require('./logger/logger');
const train = require('./routes/train');
const user = require('./routes/user');
const userBookingHistory = require('./routes/usersBookingHistory');

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  logger.info(`${req.originalUrl} - ${req.method}`);
  next();
});

app.use('/train', train);
app.use('/user', user);
app.use('/userBookingHistory', userBookingHistory);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  logger.error(
    `${err.statusCode || 500} - ${err.status} - ${err.message} - ${
    req.originalUrl
    } - ${req.method} - ${req.ip}`
  );

  // render the error page
  res.status(err.statusCode || 500);
  res.send({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
