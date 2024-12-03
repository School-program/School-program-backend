const express = require('express');
const dbConfig = require('./config/dbConfig');
const classRoutes = require('./routes/classRoutes');

const app = express();
app.use(express.json());

// חיבור למסד הנתונים
dbConfig.connect();

// הגדרת הנתיבים
app.use('/api/classes', classRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
