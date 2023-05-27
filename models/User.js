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
userSchema.pre('save', async function(next) {
	const salt = await bcrypt.genSalt();
	// console.log(salt)
	this.password = await bcrypt.hash(this.password, salt);
	// console.log(this.password)
	next();
});

/** Connection with db specific collection
 * mongoose will plurilize 'Blog' and look for 'blogs' db
 * mongoose will plurilize 'User' and look for 'users' db
 */
const User = mongoose.model('User', userSchema);
module.exports = User;