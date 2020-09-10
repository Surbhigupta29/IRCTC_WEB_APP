const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const userService = require('../service/user');
const User = require('../models/user');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = async (req, res, next) => {
  const { body: { user } } = req;
  const newUser = await userService.createUser(user);
  createSendToken(newUser, 201, res);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    res.status(404).json({
      status: 'failed',
      error: 'Please provide email and password!',
    });
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      status: 'failed',
      error: 'Incorrect email or password!',
    });
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
};

exports.restrictTo = (...roles) => {
  console.log(roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(401).json({
        status: 'failed',
        error: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    res.status(401).json({
      status: 'failed',
      error: 'You are not logged in! Please log in to get access.',
    });
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.status(401).json({
      status: 'failed',
      error: 'The user belonging to this token does no longer exist',
    });
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};