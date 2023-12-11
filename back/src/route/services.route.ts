import express from 'express';
const router = express.Router();
import * as spotifyController from '../controller/services/spotify.controller';

router.get('/spotify/login', spotifyController.login)
router.get('/spotify/auth', spotifyController.spotifyAuth)

export default router;
