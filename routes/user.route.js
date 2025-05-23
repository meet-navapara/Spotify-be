const express = require('express');
const router = express.Router();
const { login, register } = require('../controller/User.controller');

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

module.exports = router;