import express from 'express';
const router = express.Router();

const userController = require('../controller/user.controller');

router.post('/create', userController.createUser);

module.exports = router;