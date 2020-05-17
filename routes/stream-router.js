const express = require('express');

const StreamCtrl = require('../controllers/stream-ctrl');

const router = express.Router();

router.post('/stream', StreamCtrl.updateStream);
router.post('/streams', StreamCtrl.createStreams);
router.get('/stream/:id', StreamCtrl.getStreamById)

module.exports = router;
