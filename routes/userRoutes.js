const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.get('/all', authenticateToken, userController.getAllUsers);
router.post('/create', authenticateToken, userController.createUser);
router.get('/:id', authenticateToken, userController.getUserById);

module.exports = router;
