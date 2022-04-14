const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization');
		if (!token) return res.json({ msg: 'Invalid Authentication !' });

		jwt.verify(token, process.env.TOKENSECRET, (err, user) => {
			if (err) return res.json({ msg: 'Invalid token ' });
			req.user = user;
			next();
		});
	} catch (e) {
		return res.json({ msg: e.message });
	}
};

module.exports = auth;
