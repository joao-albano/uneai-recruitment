const express = require('express');
const { whatsappWebhookController } = require('../controllers/webhook.controller');

const router = express.Router();

// WhatsApp webhook endpoint
router.post('/whatsapp', whatsappWebhookController);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'webhook' });
});

module.exports = router; 