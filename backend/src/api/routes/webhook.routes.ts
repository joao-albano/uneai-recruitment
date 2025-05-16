import { Router } from 'express';
import { whatsappWebhookController } from '../controllers/webhook.controller';

const router = Router();

router.post('/whatsapp', whatsappWebhookController);

export default router; 