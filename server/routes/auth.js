const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = new express.Router();

/**
* Validate the sing up form.
*
*  @param {object} payload = the http body message
*
*  @return {object} is the result of the validation. Contains error and messages
**/

// validate the sign up page
function validateSignupForm(payload){
  const errors = {};
  let isFormValid = true;
  let message = '';

  // not email
  if(!payload || typeof payload.email != 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'please provide a valid email';
  };

  if(!payload || typeof payload.password != 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'password must be at least 8 character';
  };

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
  isFormValid = false;
  errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };

}; //signup

// validate the login page
function validateLoginForm(payload){
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
  isFormValid = false;
  errors.email = 'Please provide your email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}; //login

// add passport steategies
router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000){
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors',
          errors: {
            email: 'This email is already taken'
          }
        });
      }
      // generic error
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    });
  })(req, res, next);
  // return res.status(200).end();
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form'
      })
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in',
      token,
      user: userData
    });
  })(req, res, next);

  // return res.status(200).end();
});

module.exports = router;
