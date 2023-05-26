const User = require('../models/User')

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


/** Auth controller actions */
const signup_get = (req, res) => {
	res.render('signup', { title: 'Sign up' });
};

const login_get = (req, res) => {
	res.render('login', { title: 'Log in' });
};

const signup_post = async (req, res) => {
	const userInput = req.body;
	console.log('Data from input: email:', userInput.email, 'password: ', userInput.password);

	try {
		// create method comes with the Schema
		const user = await User.create(userInput);
		console.log('user created');
		// Need to send status and user as a json to the browser
		res.status(201).json(user);
	} catch (err) {
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