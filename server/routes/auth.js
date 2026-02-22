import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Simulated static admin user for simplicity (normally would be in DB)
// Password hash for 'kurve_admin'. (Can be overwritten by ENV vars later)
let adminHash = bcrypt.hashSync('kurve_admin', 10);

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const adminUsername = process.env.ADMIN_USER || 'sanket_admin';

    if (username === adminUsername) {
        const match = await bcrypt.compare(password, process.env.ADMIN_PASS_HASH || adminHash);
        if (match) {
            const token = jwt.sign({ id: username, role: 'admin' }, process.env.JWT_SECRET || 'sentinel_grid_secret_key', {
                expiresIn: '30d',
            });
            return res.json({ token, message: 'Access Granted' });
        }
    }

    res.status(401).json({ message: 'Invalid credentials. Access Denied.' });
});

export default router;
