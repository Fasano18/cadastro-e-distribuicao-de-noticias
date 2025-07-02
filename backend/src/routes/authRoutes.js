const express = require('express');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkLoginAttempts, incrementLoginAttempts } = require('../middlewares/loginAttemptMiddleware');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', checkLoginAttempts, incrementLoginAttempts, authController.login);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;