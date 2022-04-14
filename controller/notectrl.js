const Notes = require('../models/notesmodel');

const notesctrl = {
	getAllNotes: async (req, res) => {
		const notes = await Notes.find({}).sort({ date: -1 });
		return res.json(notes);
	},
	getNotes: async (req, res) => {
		try {
			if (!req.user) return res.json({ msg: 'Invalid Auth' });
			const notes = await Notes.find({ user_id: req.user.id }).sort({
				date: -1,
			});
			res.json(notes);
		} catch (e) {
			return res.json({ msg: e.message });
		}
	},
	createNotes: async (req, res, next) => {
		try {
			const { title, content, date } = req.body;

			if (!title || !content)
				return res.json({ msg: 'Please enter all fileds !' });

			if (title.length > 50)
				return res.json({ msg: 'Title should be less than 50 characters !' });

			const newNote = new Notes({
				title,
				content,
				date,
				user_id: req.user.id,
				name: req.user.name,
			});

			await newNote.save();

			res.json({ msg: 'Created note sucessfully !' });
		} catch (e) {
			return res.json({ msg: e.message });
		}
	},
	deleteNote: async (req, res, next) => {
		try {
			if (!req.params) return res.json({ msg: 'Note not found !' });
			await Notes.findByIdAndDelete(req.params.id);
			return res.json({ msg: 'Deleted notes sucessfully !' });
		} catch (e) {
			return res.json({ msg: e.message + 'err' });
		}
	},
	updateNote: async (req, res, next) => {
		try {
			const Note = await Notes.findById(req.params.id);
			if (Note.user_id === req.user.id) {
				const { title, content, date } = req.body;
				if ((!title, !content))
					return res.json({ msg: 'please enter all fields' });

				if (title.length > 50)
					return res.json({ msg: 'Title should be less than 50 characters !' });

				await Notes.findOneAndUpdate(
					{ _id: req.params.id },
					{
						title,
						content,
						date,
					}
				);
				return res.json({ msg: 'Updated  notes sucessfully !' });
			}
			return res.json({ msg: 'Unable to update note !' });
		} catch (e) {
			return res.json({ msg: e.message });
		}
	},
	getNote: async (req, res, next) => {
		try {
			const note = await Notes.find({ _id: req.params.id });
			return res.json(note);
		} catch (e) {
			return res.json({ msg: e.message });
		}
	},
};

module.exports = notesctrl;
