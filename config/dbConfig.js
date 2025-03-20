const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false, // מאפשר חיבור SSL גם אם האישור לא מאומת
    },
});

const connect = () => {
    pool.connect()
        .then(() => console.log('Connected to the database'))
        .catch(err => console.error('Connection error', err.stack));
};

module.exports = { pool, connect };
