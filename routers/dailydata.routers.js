const express = require('express');
const dailyDataController = require('../controllers/dailydata.controller');
const { authenticateToken} = require('../middleware/auth.middleware');

const router = express.Router();

// קריאות API עבור ה-Daily Data עם הרשאות גישה
router.post('/addAndUpdate', authenticateToken, dailyDataController.addDailyDataAndUpdateClassPoints); // רק מנהל
router.get('/byDate/:entry_date', authenticateToken, dailyDataController.getDailyDataByDate); // גישה מוגנת
router.get('/byClass/:class_id', authenticateToken, dailyDataController.getDailyDataByClass); // גישה מוגנת
router.post('/', authenticateToken, dailyDataController.createDailyData); // רק מנהל
router.get('/', authenticateToken, dailyDataController.getAllDailyData); // גישה מוגנת
router.get('/:id', authenticateToken, dailyDataController.getDailyDataById); // גישה מוגנת
router.put('/:id', authenticateToken, dailyDataController.updateDailyData); // רק מנהל
router.delete('/:id', authenticateToken, dailyDataController.deleteDailyData); // רק מנהל
router.get('/byClassAndDate/:class_id/:entry_date', authenticateToken, dailyDataController.getDailyDataByClassAndDate); // גישה מוגנת

module.exports = router;
