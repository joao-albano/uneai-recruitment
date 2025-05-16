import { Router, RequestHandler } from 'express';
import { createWhatsAppInstance, checkConnectionState, sendTextMessage } from '../controllers/whatsapp.controller';

const router = Router();

router.post('/instance', createWhatsAppInstance as RequestHandler);
router.get('/instance/:instanceId/state', checkConnectionState as RequestHandler);
router.post('/message/sendText/:instanceId', sendTextMessage as RequestHandler);

export default router; 