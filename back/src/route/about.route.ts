import express from 'express';
const router = express.Router();
import * as aboutController from '../controller/about.controller';

router.get('/', aboutController.getAbout);

export default router;