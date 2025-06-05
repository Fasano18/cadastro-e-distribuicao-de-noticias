const newsController = require('../controllers/newsControllers');
const express = require('express');
const router = express.Router();

router.post('/insert', newsController.insert);

module.exports = router;