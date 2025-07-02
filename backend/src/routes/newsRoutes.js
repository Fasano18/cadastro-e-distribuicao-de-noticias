const newsController = require('../controllers/newsControllers');
const express = require('express');
const router = express.Router();
const responseFormatter = require('../middlewares/responseFormatter');
const {
    optionalAuthMiddleware, 
    authMiddleware,
    adminMiddleware
} = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, adminMiddleware, newsController.insert, responseFormatter);
router.put('/:id', authMiddleware, adminMiddleware, newsController.update, responseFormatter);
router.delete('/:id', authMiddleware, adminMiddleware, newsController.remove, responseFormatter);

router.get('/:id', optionalAuthMiddleware, newsController.getById, responseFormatter);
router.get('/', optionalAuthMiddleware, newsController.getAll, responseFormatter);


module.exports = router;