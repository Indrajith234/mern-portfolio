const express = require('express');
const router = express.Router();
const {
  loginAdmin,
  getMessages,
  deleteMessage,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/messages', protect, getMessages);
router.delete('/messages/:id', protect, deleteMessage);

module.exports = router;
