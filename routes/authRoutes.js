const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

/** Sign up page */
router.get('/signup', authController.signup_get);
/** Log in page */
router.post('/signup', authController.signup_post);
/** Create a new user in db */
router.get('/login', authController.login_get);
/** Authenticate a current user */
router.post('/login', authController.login_post);
/** Log out a current user */
router.get('/logout', authController.logout_get);

module.exports = router;