const bcrypt = require('bcrypt');
const db = require('./config/dbConfig').pool;

(async () => {
    const username = 'admin';
    const password = '9743935'; // הסיסמה המקורית
    const role = 'admin';

    // יצירת hash תקין לסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // הוספת המשתמש לבסיס הנתונים עם הסיסמה המוצפנת
    await db.query(
        'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
        [username, hashedPassword, role]
    );

    console.log('User with encrypted password added successfully!');
})();
