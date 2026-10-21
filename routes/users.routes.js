const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controllers.js');
const { protect } = require("../middlewares/authMiddleware.js");
const { accessChat } = require('../controllers/chat.controlles.js');

router.get('/', protect, users.allUsers);
router.route('/signup').post(users.signup);
router.route('/login').post(users.login);

module.exports = router;