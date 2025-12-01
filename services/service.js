// Product input validation
function validateProductInput({ name, price, quantity, id, requireId = false }) {
	if (requireId && (id == null || id === '')) {
		return 'id is required';
	}
	if (name == null || name === '') {
		return 'name is required';
	}
	if (price == null || typeof price !== 'number' || isNaN(price)) {
		return 'price must be a number';
	}
	if (quantity == null || typeof quantity !== 'number' || isNaN(quantity) || !Number.isInteger(quantity)) {
		return 'quantity must be an integer';
	}
	return null;
}

module.exports.validateProductInput = validateProductInput;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

// Serverless-friendly Prisma client singleton
let prisma;
if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}
const JWT_SECRET = process.env.JWT_SECRET;

async function signUp({ email, password, firstName, lastName }) {
	if (!email || !password) {
		throw { status: 400, message: 'Email and password required' };
	}
	const exists = await prisma.user.findUnique({ where: { email } });
	if (exists) {
		throw { status: 409, message: 'Email already exists' };
	}
	const hashed = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({
		data: { email, password: hashed, firstName, lastName }
	});
	const token = jwt.sign(
		{ userId: user.id, email: user.email },
		JWT_SECRET,
		{ expiresIn: '6h' }
	);
	return { accessToken: token };
}

async function signIn({ email, password }) {
	if (!email || !password) {
		throw { status: 400, message: 'Email and password required' };
	}
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		throw { status: 401, message: 'Invalid credentials' };
	}
	const ok = await bcrypt.compare(password, user.password);
	if (!ok) {
		throw { status: 401, message: 'Invalid credentials' };
	}
	const token = jwt.sign(
		{ userId: user.id, email: user.email },
		JWT_SECRET,
		{ expiresIn: '6h' }
	);
	return { accessToken: token };
}

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) return res.status(401).json({ message: 'No token provided' });
	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) return res.status(403).json({ message: 'Invalid token' });
		req.user = user;
		next();
	});
}

async function getMe(userId) {
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) throw { status: 404, message: 'User not found' };
	return { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName };
}

module.exports = { signUp, signIn, authenticateToken, getMe };
