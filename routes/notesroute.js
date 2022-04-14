const router = require('express').Router();

const notesctrl = require('../controller/notectrl');
const auth = require('../middlewares/auth');

router
	.route('/')
	.get(auth, notesctrl.getAllNotes)
	.post(auth, notesctrl.createNotes);

router.route('/mynotes').get(auth, notesctrl.getNotes);

router
	.route('/:id')
	.get(auth, notesctrl.getNote)
	.put(auth, notesctrl.updateNote)
	.delete(auth, notesctrl.deleteNote);

module.exports = router;
