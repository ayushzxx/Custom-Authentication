const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // 1. Get token from cookie
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }
        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 3. Attach user to request
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
}

module.exports = authMiddleware;