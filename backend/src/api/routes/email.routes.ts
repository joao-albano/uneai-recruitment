import { Router } from 'express';
import { testConnection, sendTestEmail, sendEmail } from '../controllers/email.controller';

const router = Router();

// Rota de teste simples
router.get('/test', (req, res) => {
  console.log('Email test route accessed!');
  res.json({ message: 'Email route is working!', success: true });
});

// Rota para testar conexão SMTP
router.post('/test-connection', testConnection);

// Rota para enviar email de teste
router.post('/test-email', sendTestEmail);

// Rota para enviar um email personalizado
router.post('/send-email', sendEmail);

// Log para depuração
console.log('Módulo de rotas de email (TypeScript) carregado!');

export default router; 