import express from 'express';
const router = express.Router();
import * as userController from '../controller/user.controller';
import verifyToken from '../middleware/verifyToken';

/** Definitions of routes */
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', verifyToken, userController.logout);
router.get('/me', verifyToken, userController.getUserInfo);
router.delete('/delete', verifyToken, userController.deleteAccount);
router.put('/modifyUsername', verifyToken, userController.modifyUsername);

export default router;
