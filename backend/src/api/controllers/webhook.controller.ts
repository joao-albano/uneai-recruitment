import { Request, Response } from 'express';
import { WebhookService } from '../services/webhook.service';
import { WhatsAppWebhookPayload } from '../types/webhook.types';

export async function whatsappWebhookController(req: Request, res: Response) {
  try {
    const payload = req.body as WhatsAppWebhookPayload;

    // Validate required fields
    if (!payload.event || !payload.data || !payload.data.key) {
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }

    // Process the message
    await WebhookService.processWhatsAppMessage(payload);

    // Return success
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in WhatsApp webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 