/** Auth controller actions */

const signup_get = (req, res) => {
	res.render('signup', {title: 'Sign up'});
};

const login_get = (req, res) => {
	res.render('login', {title: 'Log in'});
};

const signup_post = async (req, res) => {
	res.send('new signup', {title: 'Post'});
};

const login_post = async (req, res) => {
	res.send('user login', {title: 'Post'});
};

/** Export all middlewares to use them on authRoutes */
module.exports = {
	signup_get,
	login_get,
	signup_post,
	login_post
};