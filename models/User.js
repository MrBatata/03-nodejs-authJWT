const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

/** mongoose Schema
 * Allows the use of User Schema in mongoDB
 * including all its methods.
 * Eg. User.create(userInputFromForm) 
 */
const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Please enter an email'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please enter a valid email']
	},
	password: {
		type: String,
		required: [true, 'Please enter a password'],
		minlength: [6, 'Minimum password length is 6 characters'],
	},
}, { timestamps: true });

/** Connection with db specific collection
 * mongoose will plurilize 'Blog' and look for 'blogs' db
 * mongoose will plurilize 'User' and look for 'users' db
 */
const User = mongoose.model('User', userSchema);
module.exports = User;