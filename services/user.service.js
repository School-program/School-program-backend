const db = require('../config/dbConfig').pool;
const bcrypt = require('bcrypt');

const User = {
    create: async (username, password, role) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, role]
        );
        return result.rows[0];
    },
    findByUsername: async (username) => {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    },
};

module.exports = User;
