const router = require('express').Router();
const userctrl = require('../controller/userctrl');
const auth = require('../middlewares/auth');

// register user
router.post('/', userctrl.registeruser);

// login user
router.post('/login', userctrl.loginuser);

// verify token
router.get('/verify', userctrl.verifiedtoken);

module.exports = router;
