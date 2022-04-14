const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Please enter your username !'],
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Please enter your Password !'],
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
