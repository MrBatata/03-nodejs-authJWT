const User = require('../models/User');
const jwt = require('jsonwebtoken');

/** Handle User Schema errors */
const handleUserErrors = (err) => {
	// console.log('err.message: ', err.message, 'err.code: ', err.code);
	let errors = { email: '', password: '' };

	// duplicate email error
	if (err.code === 11000) {
		errors.email = 'that email is already registered';
		return errors;
	};

	// validation errors
	if (err.message.includes('User validation failed')) {
		// console.log(err);
		Object.values(err.errors).forEach(({ properties }) => {
			// console.log(val);
			// console.log(properties);
			errors[properties.path] = properties.message;
		});
	};

	return errors;
};

/** JSON web token*/
const maxAge = 3 * 24 * 60 * 60; // time duration of token within server (in seconds)
const createToken = (id) => {
  return jwt.sign({ id }, 'secreto de batata', {
    expiresIn: maxAge
  }); // TODO: secreto debe estar oculto (process.env?)
};

/** Auth controller actions */
const signup_get = (req, res) => {
	res.render('signup', { title: 'Sign up' });
};

const login_get = (req, res) => {
	res.render('login', { title: 'Log in' });
};

const signup_post = async (req, res) => {
	// console.log(req);
	const userInput = req.body;
	console.log('Data from input: email: ', userInput.email, ' & password: ', userInput.password);

	try {
		// create method comes with the Schema
		const user = await User.create(userInput);
		// console.log('user successfully created');
		const token = createToken(user._id);
		// Need to send status, token as cookie and user (just id or email) to the browser
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }); // cookie duration in miliseconds
		res.status(201).json({ user: user._id });
	} 
	catch (err) {
		// console.log(err);
		const errors = handleUserErrors(err);
		console.log(errors);
		res.status(400).json(errors);
	};
};

const login_post = async (req, res) => {
	console.log('done');
	const user = req.body;
	console.log(user.email, user.password);
	res.redirect('/');
};

/** Export all middlewares to use them on authRoutes */
module.exports = {
	signup_get,
	login_get,
	signup_post,
	login_post
};