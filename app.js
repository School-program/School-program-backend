const express = require('express');
const dbConfig = require('./config/dbConfig');
const classRoutes = require('./routers/classes.routers');
const dailyDataRoutes = require('./routers/dailydata.routers');
const cors = require('cors');

const app = express();
app.use(cors()); // מאפשר לכל הדומיינים לגשת

app.use(express.json());

dbConfig.connect();

app.use('/classes', classRoutes);
app.use('/dailydata', dailyDataRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
