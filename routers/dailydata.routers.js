const express = require('express');
const dailyDataController = require('../controllers/dailydata.controller');

const router = express.Router();

// קריאות API עבור ה-Daily Data
router.post('/addAndUpdate', dailyDataController.addDailyDataAndUpdateClassPoints); // עבור ה-POST עם העדכון
router.get('/byDate/:entry_date', dailyDataController.getDailyDataByDate); // שליפה לפי תאריך
router.get('/byClass/:class_id', dailyDataController.getDailyDataByClass); // שליפה לפי כיתה
router.post('/', dailyDataController.createDailyData);
router.get('/', dailyDataController.getAllDailyData);
router.get('/:id', dailyDataController.getDailyDataById);
router.put('/:id', dailyDataController.updateDailyData);
router.delete('/:id', dailyDataController.deleteDailyData);
router.get('/byClassAndDate/:class_id/:entry_date', dailyDataController.getDailyDataByClassAndDate);


module.exports = router;
