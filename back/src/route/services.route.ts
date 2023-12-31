import express from 'express';
const router = express.Router();
import * as spotifyController from '../controller/services/spotify.controller'
import verifyToken from '../middleware/verifyToken';
import {spotifyAuth, spotifyAlreadyAuth} from '../middleware/services/Auth/spotifyAuth.middleware';
import userAlreadyAuth from '../middleware/services/userAlreadyAuth.middleware';
import { refreshTokens } from '../middleware/services/refreshTokens.middleware';

/** Definitions of routes */
router.post('/spotify/registerToken', verifyToken, spotifyAuth, userAlreadyAuth, spotifyController.registerToken)

export default router;
