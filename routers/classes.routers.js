const express = require('express');
const classController = require('../controllers/classes.controller');

const router = express.Router();

router.post('/', classController.createClass);
router.get('/', classController.getAllClasses);
router.get('/top-three', classController.getTopThreeClasses);
router.get('/yearly-points', classController.getYearlyPoints);
router.get('/:id', classController.getClassById);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

module.exports = router;
