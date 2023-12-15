import express from 'express';
const router = express.Router();
import * as spotifyController from '../controller/services/spotify.controller'
import verifyToken from '../middleware/verifyToken';

/** Definitions of routes */
router.post('/spotify/registerToken', spotifyController.registerToken)

export default router;
