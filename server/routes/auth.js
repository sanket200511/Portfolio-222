import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check against Environment Variables, falling back to defaults if not set
    const adminUsername = process.env.ADMIN_USER || 'sanket_admin';
    const adminPassword = process.env.ADMIN_PASS || 'kurve_admin';

    if (username === adminUsername && password === adminPassword) {
        const token = jwt.sign(
            { id: username, role: 'admin' },
            process.env.JWT_SECRET || 'sentinel_grid_secret_key',
            { expiresIn: '30d' }
        );
        return res.json({ token, message: 'Access Granted' });
    }

    res.status(401).json({ message: 'Invalid credentials. Access Denied.' });
});

export default router;
