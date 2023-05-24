const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

/** Middleware */
app.use(express.static('public'));

/** EJS view engine */
app.set('view engine', 'ejs');

/** MongoDB connection w/mongoose */
const dbname = 'Cluster0';
const dbURI = `mongodb+srv://user01:user01@cluster0.9j9lkcu.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		app.listen(port);
		console.log(`connected to http://localhost:${port}/`);
	})
	.catch((err) => console.log(err));

/** Routes */
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));