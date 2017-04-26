const express = require('express');
const validator = require('validator');

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

router.post('/signup', (req, res) => {
  const validationResult = validateSignupForm(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return res.status(200).end();
});

router.post('/login', (req, res) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return res.status(200).end();
});

module.exports = router;
