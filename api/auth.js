const express = require('express');
const router = express.Router();
const { signUp, signIn, authenticateToken, getMe } = require('../services/service');

router.post('/sign-up', async (req, res) => {
	try {
		const { email, password, firstName, lastName } = req.body;
		const result = await signUp({ email, password, firstName, lastName });
		res.status(201).json(result);
	} catch (err) {
		console.error(err);
		res.status(err.status || 500).json({ message: err.message || 'Something went wrong' });
	}
});

router.post('/sign-in', async (req, res) => {
	try {
		const { email, password } = req.body;
		const result = await signIn({ email, password });
		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(err.status || 500).json({ message: err.message || 'Something went wrong' });
	}
});

router.get('/me', authenticateToken, async (req, res) => {
	try {
		const user = await getMe(req.user.userId);
		res.json({ user });
	} catch (err) {
		console.error(err);
		res.status(err.status || 500).json({ message: err.message || 'Something went wrong' });
	}
});

module.exports = router;
