const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware.js');
const { accessChat, fetchChats } = require('../controllers/chat.controlles.js');

// POST /api/chats
router.post('/', protect, accessChat);
router.get("/", protect, fetchChats);

module.exports = router;