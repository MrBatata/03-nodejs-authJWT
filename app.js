const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middlewares/authMiddleware');

/** Express start */
const app = express();
const port = 3000;

/** Express middleware: Public data */
app.use(express.static('public'));

/** Express middleware: Handle URL-encoded form data
 * Parsing URL-encoded form data 
 * and making it available in req.body. 
 * This middleware allows you to access form data submitted 
 * from HTML forms using req.body, 
 * even without explicitly using the body-parser package
*/
app.use(express.urlencoded({ extended: true }));

/** Express middlewares: Handle all JSON data */
app.use(express.json());

/** Morgan middleware */
app.use(morgan('dev'));

/** Cookie handler middleware */
app.use(cookieParser());

/** EJS view engine */
app.set('view engine', 'ejs');

/** MongoDB connection w/mongoose */
const dbURI = process.env.MONGODB_URI;
// const dbURIweb = process.env.MONGODB_URI_WEB; // This won't work with the database...
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((res) => {
		app.listen(port);
		console.log(`connected to http://localhost:${port}/`);
	})
	.catch((err) => console.log(err));

/** Routes
 * for smoothies page, we should validate token auth
 */
app.get('/', (req, res) => res.render('home', { title: 'Start' }));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies', { title: 'Choose your smoothie' }));

/** Auth routes w/ methods */
app.use(authRoutes);

/** Cookies introduction
 * imports and middleware use
 */
app.get('/set-cookies', (req, res) => {

	// res.setHeader('Set-Cookie', 'newUser=true');

	// same with express
	res.cookie('newUser', false);
	res.cookie('isEmployee', true, {
		maxAge: 1000 * 60 * 60 * 24,
		httpOnly: true
	});

	res.send('you got the cookies!');
});

app.get('/read-cookies', (req, res) => {

	const cookies = req.cookies;
	console.log(cookies.newUser);

	res.json(cookies);
});

/** 404 route */
app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
});
