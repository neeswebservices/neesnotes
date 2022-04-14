require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT ?? 8000;
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userrouter = require('./routes/userrouter');
const notesrouter = require('./routes/notesroute');
const path = require('path');

const { connectdb } = require('./db/connectdb');

app.use(express.json());
app.use(cors());

app.use('/api/user/auth', userrouter);
app.use('/api/notes', notesrouter);

connectdb();

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
