const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


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

/** mongoose hooks "pre"
 * fires a function before doc saved to db 
 */
userSchema.pre('save', function (next) {
	console.log('user about to be created & saved is', this); // `this` is the complete User Schema to be created
	next();
});

/** mongoose hook "post"
 * fires a function after doc saved to db 
 */
userSchema.post('save', function (doc, next) {
	console.log('new user was created & saved', doc);
	next();
});

/** mongoose hook: hashing password */
userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	// It's important to pass a salt round value to this function for better security.
	// The higher the round value, the more secure but slower the hashing process becomes.

	// console.log(salt)

	try {
		this.password = await bcrypt.hash(this.password, salt)
		console.log('password successfully hashed')
		next();
	} catch (err) {
		console.log('password not hashed, with error: ', err)
	};
});

/** Connection with db specific collection
 * mongoose will plurilize 'Blog' and look for 'blogs' db
 * mongoose will plurilize 'User' and look for 'users' db
 */
const User = mongoose.model('User', userSchema);
module.exports = User;