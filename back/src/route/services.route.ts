import express from 'express';
const router = express.Router();
import * as servicesController from '../controller/services/services.controller'
import * as spotifyController from '../controller/services/spotify.controller'
import * as discordController from '../controller/services/discord.controller'
import * as microsoftController from '../controller/services/microsoft.controller'
import verifyToken from '../middleware/verifyToken';
import {spotifyAuth} from '../middleware/services/Auth/spotifyAuth.middleware';
import {userAlreadyAuth, userAlreadyAuthMicrosoft} from '../middleware/services/userAlreadyAuth.middleware';
import { refreshTokens } from '../middleware/services/refreshTokens.middleware';
import { discordAuth } from '../middleware/services/Auth/discordAuth.middleware';
import { microsoftAuth } from '../middleware/services/Auth/microsoftAuth.middleware';

/** Definitions of routes */
router.post('/spotify/registerToken', verifyToken, spotifyAuth, refreshTokens, userAlreadyAuth, spotifyController.registerToken)
router.post('/discord/registerToken', verifyToken, discordAuth, discordController.registerToken)
router.get('/discord/getCode', discordController.getCode);
router.get('/discord/getToken', discordController.getToken);
router.post('/microsoft/registerToken', verifyToken, microsoftAuth, userAlreadyAuthMicrosoft, microsoftController.registerToken)
router.get('/microsoft/userHasToken', verifyToken, microsoftController.userHasToken)
router.delete('/removetoken', verifyToken, servicesController.removeOauthTokenByServiceId)

export default router;
