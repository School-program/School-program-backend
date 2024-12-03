const db = require('../config/dbConfig').pool;

const Class = {
    create: async (class_name, total_points) => {
        const result = await db.query('INSERT INTO Classes (class_name, total_points) VALUES (\$1, \$2) RETURNING *', [class_name, total_points]);
        return result.rows[0];
    },
    getAll: async () => {
        const result = await db.query('SELECT * FROM classes');
        return result.rows;
    },
    getById: async (id) => {
        const result = await db.query('SELECT * FROM Classes WHERE class_id = \$1', [id]);
        return result.rows[0];
    },
    update: async (id, class_name, total_points) => {
        const result = await db.query('UPDATE Classes SET class_name = \$1, total_points = \$2 WHERE class_id = \$3 RETURNING *', [class_name, total_points, id]);
        return result.rows[0];
    },
    delete: async (id) => {
        const result = await db.query('DELETE FROM Classes WHERE class_id = \$1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = Class;
