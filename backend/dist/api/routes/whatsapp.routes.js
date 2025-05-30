"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const whatsapp_controller_1 = require("../controllers/whatsapp.controller");
const router = (0, express_1.Router)();
router.post('/instance', whatsapp_controller_1.createWhatsAppInstance);
router.get('/instance/:instanceId/state', whatsapp_controller_1.checkConnectionState);
router.post('/message/sendText/:instanceId', whatsapp_controller_1.sendTextMessage);
exports.default = router;
