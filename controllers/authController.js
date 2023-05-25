const User = require('../models/user')
/** Auth controller actions */

const signup_get = (req, res) => {
	res.render('signup', { title: 'Sign up' });
};

const login_get = (req, res) => {
	res.render('login', { title: 'Log in' });
};

const signup_post = async (req, res) => {
	console.log('done');
	const userInput = req.body;
	console.log(userInput.email, userInput.password);

	try {
		// create method comes with the Schema
		const user = await User.create(userInput);
		// Need to send status and user as a json to the browser
		res.status(201).json(user).redirect('/');
	} catch (error) {
		console.log(error);
		res.status(400).send('error, user not created')
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