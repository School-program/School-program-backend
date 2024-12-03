const express = require('express');
const dailyDataController = require('../controllers/dailydata.controller');

const router = express.Router();

// קריאות API עבור ה-Daily Data
router.post('/', dailyDataController.createDailyData);
router.get('/', dailyDataController.getAllDailyData);
router.get('/:id', dailyDataController.getDailyDataById);
router.put('/:id', dailyDataController.updateDailyData);
router.delete('/:id', dailyDataController.deleteDailyData);

module.exports = router;
