const router = require('express').Router();

const {eegistration, login, profile, updatePassword} = require('../controller');
const {userRegistrationValidation, loginValidation, updatePasswordValidation} = require('../validation/auth-validation');
const {validationsResult} = require('../validation');
const {authorizeToken} = require('../middleware');

router.post('/register-user', userRegistrationValidation, validationsResult, eegistration);

router.post('/login', loginValidation, validationsResult, login);

router.get('/profile', authorizeToken, profile);

router.post('/update-password', authorizeToken, updatePasswordValidation, validationsResult, updatePassword);

module.exports = router;