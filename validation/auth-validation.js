const {check} = require('express-validator');


exports.userRegistrationValidation = [
  // First Name Validation 
  check('firstName', 'First Name is required').not().isEmpty().escape(),
  check('firstName', 'First Name should contain only Alphabets').isAlpha(),
  check('firstName', 'First Name between 2 to 32 character').isLength({min: 3, max: 32}),
  // Last Name Validation 
  check('lastName', 'First Name is required').not().isEmpty().trim().escape(),
  check('lastName', 'First Name should contain only Alphabets').isAlpha(),
  check('lastName', 'First Name between 2 to 32 character').isLength({min: 3, max: 32}),
  // Email validation
  check('email', 'Email is required').not().isEmpty().trim().escape(),
  check('email', 'Email is invalid').isEmail(),
  check('email', 'Email between 5 to 32 character').isLength({min: 5, max: 32}).normalizeEmail({
    gmail_lowercase: true, gmail_remove_dots: true, gmail_remove_subaddress: true
  }),
  // Password Validation 
  check('password', 'Password is required').not().isEmpty().escape(),
  check('password', "Password between 6 to 32 character").isLength({ min: 6, max: 32}),
  // Checking password match with confirmPassword
  check('password', 'Password did not match').custom((value , {req, loc, path}) => {
    if (value !== req.body.confirmPassword) {
      throw new Error("Passwords don't match");
    } else {
      return value;
    }
  })
];


exports.loginValidation = [
  // Email validation
  check('email', 'Email is required').not().isEmpty().trim().escape(),
  check('email', 'Email is invalid').isEmail(),
  check('email', 'Email between 5 to 32 character').isLength({min: 5, max: 32}).normalizeEmail({
    gmail_lowercase: true, gmail_remove_dots: true, gmail_remove_subaddress: true
  }),
  // Password Validation 
  check('password', 'Password is required').not().isEmpty().escape(),
  check('password', "Password between 6 to 32 character").isLength({ min: 6, max: 32})
]

exports.updatePasswordValidation = [
  // Old Password Validation 
  check('oldPassword', 'Old Password is required').not().isEmpty().escape(),
  check('oldPassword', "Old Password between 6 to 32 character").isLength({ min: 6, max: 32}),
  check('oldPassword', 'New password can not same as old password').custom((value , {req, loc, path}) => {
    if (value === req.body.password) {
      throw new Error("New password can not same as old password");
    } else {
      return value;
    }
  }),
  // Password Validation 
  check('password', 'Password is required').not().isEmpty().escape(),
  check('password', "Password between 6 to 32 character").isLength({ min: 6, max: 32}),
  // Checking password match with confirmPassword
  check('password', 'Password did not match').custom((value , {req, loc, path}) => {
    if (value !== req.body.confirmPassword) {
      throw new Error("Passwords don't match");
    } else {
      return value;
    }
  })
]