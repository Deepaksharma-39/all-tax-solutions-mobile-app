const jwt = require('jsonwebtoken');
const config = require("config.json");
const db = require('helpers/db');

module.exports = authorize;

function authorize(roles = []) {
    return async (req, res, next) => {
        try {
            // Extract token from Authorization header
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Missing Authorization header' });
            }

            // Verify JWT token and extract user ID
            const decoded = jwt.verify(token, config.secret, { algorithms: ['HS256'] });
            const userId = decoded.sub;

            // Fetch user from database
            const user = await db.User.findByPk(userId);

            // Check if user exists
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            // Check if user has required roles
            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({ message: 'Insufficient permissions' });
            }

            // Pass user details to the next middleware
            req.user = user;
            next();
        } catch (error) {
            // Handle token verification errors
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    };
}
