const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  loginAdmin,
  getMessages,
  deleteMessage,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// Limit login to 10 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, loginAdmin);
router.get('/messages', protect, getMessages);
router.delete('/messages/:id', protect, deleteMessage);

module.exports = router;
