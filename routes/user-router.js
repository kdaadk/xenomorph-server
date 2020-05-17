const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');

const router = express.Router();

router.post('/user', UserCtrl.updateUser);
router.get('/user/:id', UserCtrl.getUserById)

module.exports = router;
