const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');

/** Express start */
const app = express();
const port = 3000;

/** Public data Middleware */
app.use(express.static('public'));

/** Express middlewares 
 * data from forms... to use "req.body"
 */
app.use(express.json());
// Not sure about the 2 below...
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

/** Morgan middleware */
app.use(morgan('dev'));

/** EJS view engine */
app.set('view engine', 'ejs');

/** MongoDB connection w/mongoose */
const dbURI = process.env.MONGODB_URI
const dbURIweb = process.env.MONGODB_URI_WEB; // This won't work with the database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((res) => {
		app.listen(port);
		console.log(`connected to http://localhost:${port}/`);
	})
	.catch((err) => console.log(err));

/** Routes */
app.get('/', (req, res) => res.render('home', {title: 'Start'}));
app.get('/smoothies', (req, res) => res.render('smoothies', {title: 'Choose your smoothie'}));

/** Auth routes w/ methods */
app.use(authRoutes);

/** 404 route */
app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
});