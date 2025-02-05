const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../services/user.service');

const SECRET_KEY = 'your_secret_key'; // יש לשמור ב-ENV

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findByUsername(username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
};

module.exports = { login };
