"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_controller_1 = require("../controllers/email.controller");
const router = (0, express_1.Router)();
// Rota de teste simples
router.get('/test', (req, res) => {
    console.log('Email test route accessed!');
    res.json({ message: 'Email route is working!', success: true });
});
// Rota para testar conexão SMTP
router.post('/test-connection', email_controller_1.testConnection);
// Rota para enviar email de teste
router.post('/test-email', email_controller_1.sendTestEmail);
// Rota para enviar um email personalizado
router.post('/send-email', email_controller_1.sendEmail);
// Log para depuração
console.log('Módulo de rotas de email (TypeScript) carregado!');
exports.default = router;
