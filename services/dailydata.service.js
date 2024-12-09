const db = require('../config/dbConfig').pool;

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0'); // יום
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // חודש
    const year = date.getFullYear(); // שנה
    return `${day}/${month}/${year}`;
};

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
        return result.rows.map(row => ({
            ...row,
            entry_date: formatDate(row.entry_date) // שינוי פורמט התאריך
        }));
    },
    getById: async (id) => {
        const result = await db.query('SELECT * FROM dailydata WHERE entry_id = $1', [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return {
                ...row,
                entry_date: formatDate(row.entry_date) // שינוי פורמט התאריך
            };
        }
        return null;
    },
    update: async (id, class_id, entry_date, chairs, sweep, lightswindows, board, total_points) => {
        const result = await db.query(
            'UPDATE dailydata SET class_id = $1, entry_date = $2, chairs = $3, sweep = $4, lightswindows = $5, board = $6, total_points = $7 WHERE entry_id = $8 RETURNING *',
            [class_id, entry_date, chairs, sweep, lightswindows, board, total_points, id]
        );
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return {
                ...row,
                entry_date: formatDate(row.entry_date) // שינוי פורמט התאריך
            };
        }
        return null;
    },
    delete: async (id) => {
        const result = await db.query('DELETE FROM dailydata WHERE entry_id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return {
                ...row,
                entry_date: formatDate(row.entry_date) // שינוי פורמט התאריך
            };
        }
        return null;
    },
    getByDate: async (entry_date) => {
        const result = await db.query('SELECT * FROM dailydata WHERE entry_date = $1', [entry_date]);
        return result.rows.map(row => ({
            ...row,
            entry_date: formatDate(row.entry_date) // שינוי פורמט התאריך
        }));
    },
    getByClass: async (class_id) => {
        const result = await db.query('SELECT * FROM dailydata WHERE class_id = $1', [class_id]);
        return result.rows.map(row => ({
            ...row,
            entry_date: formatDate(row.entry_date) // שינוי פורמט התאריך
        }));
    },
    updateClassPoints: async (class_id, added_points) => {
        const result = await db.query('SELECT total_points FROM classes WHERE class_id = $1', [class_id]);

        if (result.rows.length > 0) {
            const currentPoints = result.rows[0].total_points;

            // חישוב הציון הסופי החדש
            const newPoints = currentPoints + added_points;

            // עדכון הציון בטבלת הכיתות
            const updateResult = await db.query(
                'UPDATE classes SET total_points = $1 WHERE class_id = $2 RETURNING *',
                [newPoints, class_id]
            );

            return updateResult.rows[0];
        }
        return null;
    },
    getByClassAndDate: async (class_id, entry_date) => {
        const result = await db.query('SELECT * FROM dailydata WHERE class_id = $1 AND entry_date = $2', [class_id, entry_date]);
        return result.rows.map(row => ({
          ...row,
          entry_date: formatDate(row.entry_date) // שינוי פורמט התאריך
        }));
      },
      
};

module.exports = DailyData;
