import express from 'express';
const router = express.Router();
import * as userController from '../controller/user.controller';
import verifyToken from '../middleware/verifyToken';

/** Definitions of routes */
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', verifyToken, userController.logout);
router.get('/me', verifyToken, userController.getUserInfo);
router.put('/me/username', verifyToken, userController.updateUserUsername);
router.put('/me/email', verifyToken, userController.updateUserEmail);
router.put('/me/password', verifyToken, userController.updateUserPassword);

export default router;
