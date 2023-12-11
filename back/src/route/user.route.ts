import express from 'express';
const router = express.Router();
import * as userController from '../controller/user.controller';
import verifyToken from '../middleware/verifyToken';

/** Definitions of routes */
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', verifyToken, userController.logout);

export default router;
