const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 6
	},
}, { timestamps: true });

/** Connection with db specific collection */
// mongoose will plurilize 'Blog' and look for 'blogs' db
// mongoose will plurilize 'User' and look for 'users' db
const User = mongoose.model('User', userSchema);
module.exports = User;