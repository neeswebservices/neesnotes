const mongoose = require('mongoose');

const notesSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		user_id: {
			type: String,
			requied: true,
		},
		name: {
			type: String,
			required: true,
		},
		user_id: {
			required: true,
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Notes', notesSchema);
