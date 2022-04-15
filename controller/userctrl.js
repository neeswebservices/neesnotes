const User = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userctrl = {
	registeruser: async (req, res) => {
		try {
			const { username, email, password } = req.body;

			if (!username || !email || !password)
				return res.json({ msg: 'Please enter all the fields' });

			const user = await User.findOne({ email });
			const user1 = await User.findOne({ username });

			if (user) return res.json({ msg: 'Useremail already exists ! ' });

			if (user1) return res.json({ msg: 'Username already exists ! ' });

			if (username.length < 5)
				return res.json({ msg: 'Username must be atleast 5 characters ! ' });

			const passwordHash = await bcrypt.hash(password, 12);

			const newuser = new User({
				username,
				email,
				password: passwordHash,
			});
			await newuser.save();

			res.json({ msg: 'User created sucessfully please login !' });
		} catch (e) {
			return res.json({ msg: e.message });
		}
	},
	loginuser: async (req, res, next) => {
		try {
			const { email, password, username } = req.body;

			if (!email || !password)
				return res.json({ msg: 'Please enter all the fields ' });

			const user = await User.findOne({ email });

			if (!user) return res.json({ msg: 'User doesnot exists !' });

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) return res.json({ msg: 'Invalid Password !' });

			const payload = {
				id: user._id,
				name: user.username,
			};

			const token = jwt.sign(payload, process.env.TOKENSECRET, {
				expiresIn: '1d',
			});

			res.json({ msg: 'Logged is sucessfully', token });
		} catch (e) {
			return res.json({ msg: e.message });
		}
	},
	verifiedtoken: async (req, res, next) => {
		try {
			const token = req.header('Authorization');
			if (!token) return res.send(false);
			jwt.verify(token, process.env.TOKENSECRET, async (err, verified) => {
				if (err) return res.send(false);
				const user = await User.findById(verified.id);
				if (!user) return res.send(false);
				return res.send(true);
			});
		} catch (e) {
			return res.json({ msg: e.message });
		}
	},
};

module.exports = userctrl;
