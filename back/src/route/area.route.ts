import express from 'express';
const router = express.Router();
import * as areaController from '../controller/area.controller';
import verifyToken from '../middleware/verifyToken';

/** Definitions of routes */
router.post('/getActionsFromServiceId/:serviceId', verifyToken, areaController.getActionsFromServiceId);
router.post('/getReactionsFromActionId/:actionId', verifyToken, areaController.getReactionsFromActionId);
router.post('/getServices', verifyToken, areaController.getServices);

export default router;
