const db = require('../config/dbConfig').pool;

const Class = {
    create: async (class_name, total_points) => {
        const result = await db.query('INSERT INTO classes (class_name, total_points) VALUES (\$1, \$2) RETURNING *', [class_name, total_points]);
        return result.rows[0];
    },
    getAll: async () => {
        const result = await db.query('SELECT * FROM classes order by class_id');
        return result.rows;
    },
    getById: async (id) => {
        const result = await db.query('SELECT * FROM classes WHERE class_id = \$1', [id]);
        return result.rows[0];
    },
    update: async (id, class_name, total_points) => {
        const result = await db.query('UPDATE classes SET class_name = \$1, total_points = \$2 WHERE class_id = \$3 RETURNING *', [class_name, total_points, id]);
        return result.rows[0];
    },
    delete: async (id) => {
        const result = await db.query('DELETE FROM classes WHERE class_id = \$1 RETURNING *', [id]);
        return result.rows[0];
    },
    getTopThreeClasses: async () => {
        const result = await db.query(
            'SELECT * FROM classes ORDER BY total_points DESC LIMIT 3'
        );
        return result.rows;
    },
    getYearlyPoints: async () => {
        const result = await db.query(`
            SELECT 
                SUBSTRING(class_name FROM '^[^0-9]*') AS year,
                SUM(total_points) AS total_points
            FROM classes
            GROUP BY year
            ORDER BY total_points DESC
        `);
        return result.rows;
    },
    
    
};

module.exports = Class;
