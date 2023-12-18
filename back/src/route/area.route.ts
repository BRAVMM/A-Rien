import express from 'express';
const router = express.Router();
import * as areaController from '../controller/area.controller';
import verifyToken from '../middleware/verifyToken';

/** Definitions of routes */
router.get('/getActionsFromServiceId/:serviceId', verifyToken, areaController.getActionsFromServiceId);
router.get('/getReactionsFromActionId/:actionId', verifyToken, areaController.getReactionsFromActionId);
router.get('/getServices', verifyToken, areaController.getServices);
router.get('/getOauthIdsFromServiceId/:serviceId', verifyToken, areaController.getOauthIdsFromServiceId);
router.get('/getOauthIdsFromActionId/:actionId', verifyToken, areaController.getOauthIdsFromActionId);
router.get('/getOauthIdsFromReactionId/:reactionId', verifyToken, areaController.getOauthIdsFromReactionId);
router.post('/storeArea', verifyToken, areaController.storeArea);

export default router;
