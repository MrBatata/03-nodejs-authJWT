/** Auth controller actions */

const signup_get = (req, res) => {
	res.render('signup', {title: 'Sign up'});
};

const login_get = (req, res) => {
	res.render('login', {title: 'Log in'});
};

const signup_post = async (req, res) => {
	console.log('done');
	const user = req.body;
	console.log(user.email, user.password);
	res.redirect('/');
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