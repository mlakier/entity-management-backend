const jwt = require('jsonwebtoken');
require('dotenv').config(); // ✅ Load environment variables

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// ✅ Middleware for authenticating users
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        console.error('🔥 Invalid Token:', error);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = authMiddleware;

