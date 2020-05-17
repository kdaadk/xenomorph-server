const express = require('express');

const ActivityCtrl = require('../controllers/activity-ctrl');

const router = express.Router();

router.post('/activity', ActivityCtrl.createActivity);
router.post('/activities', ActivityCtrl.createActivities);
router.get('/activities', ActivityCtrl.getActivities);
router.get('/lastActivity', ActivityCtrl.getLastActivity);

module.exports = router;
