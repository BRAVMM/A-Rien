import express from 'express';
const router = express.Router();
import * as spotifyController from '../controller/services/spotify.controller'
import verifyToken from '../middleware/verifyToken';
import tokenRegistered from '../middleware/tokenRegistered';

/** Definitions of routes */
router.post('/spotify/registerToken', verifyToken, spotifyController.registerToken)

export default router;
