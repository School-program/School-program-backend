const db = require('../config/dbConfig').pool;

const DailyData = {
    create: async (class_id, entry_date, chairs, sweep, lightswindows, board, total_points) => {
        const result = await db.query(
            'INSERT INTO dailydata (class_id, entry_date, chairs, sweep, lightswindows, board, total_points) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [class_id, entry_date, chairs, sweep, lightswindows, board, total_points]
        );
        return result.rows[0];
    },
    getAll: async () => {
        const result = await db.query('SELECT * FROM dailydata');
        return result.rows;
    },
    getById: async (id) => {
        const result = await db.query('SELECT * FROM dailydata WHERE entry_id = $1', [id]);
        return result.rows[0];
    },
    update: async (id, class_id, entry_date, chairs, sweep, lightswindows, board, total_points) => {
        const result = await db.query(
            'UPDATE dailydata SET class_id = $1, entry_date = $2, chairs = $3, sweep = $4, lightswindows = $5, board = $6, total_points = $7 WHERE entry_id = $8 RETURNING *',
            [class_id, entry_date, chairs, sweep, lightswindows, board, total_points, id]
        );
        return result.rows[0];
    },
    delete: async (id) => {
        const result = await db.query('DELETE FROM dailydata WHERE entry_id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = DailyData;
