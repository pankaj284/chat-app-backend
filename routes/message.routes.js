const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware.js');
const { sendMessage, allMessages } = require('../controllers/message.controllers.js');

router.post('/', protect, sendMessage);
router.get('/:chatId', protect, allMessages);

module.exports = router;