import express from 'express';
const router = express.Router();
import * as spotifyController from '../controller/services/spotify.controller'
import * as discordController from '../controller/services/discord.controller'
import verifyToken from '../middleware/verifyToken';
import {spotifyAuth, spotifyAlreadyAuth} from '../middleware/services/Auth/spotifyAuth.middleware';
import userAlreadyAuth from '../middleware/services/userAlreadyAuth.middleware';
import { refreshTokens } from '../middleware/services/refreshTokens.middleware';
import { discordAuth } from '../middleware/services/Auth/discordAuth.middleware';

/** Definitions of routes */
router.post('/spotify/registerToken', verifyToken, spotifyAuth, userAlreadyAuth, spotifyController.registerToken)
router.post('/discord/registerToken', verifyToken, discordAuth, discordController.registerToken)

export default router;
