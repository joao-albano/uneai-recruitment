"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsappWebhookController = whatsappWebhookController;
const webhook_service_1 = require("../services/webhook.service");
async function whatsappWebhookController(req, res) {
    try {
        const payload = req.body;
        // Validate required fields
        if (!payload.event || !payload.data || !payload.data.key) {
            return res.status(400).json({ error: 'Invalid webhook payload' });
        }
        // Process the message
        await webhook_service_1.WebhookService.processWhatsAppMessage(payload);
        // Return success
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error('Error in WhatsApp webhook:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
