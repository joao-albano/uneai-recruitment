import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import whatsappRoutes from './api/routes/whatsapp.routes';
import webhookRoutes from './api/routes/webhook.routes';
import emailRoutes from './api/routes/email.routes';
import { sendEmail } from './api/controllers/email.controller';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Middleware para logar todas as requisições (debug)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Recebida requisição: ${req.method} ${req.originalUrl}`);
  // Log headers for more details
  // console.log('Headers:', req.headers);
  next();
});

// Direct route for email sending to bypass routing issues
app.post('/email/send-email', (req, res) => {
  console.log('[DIRECT ROUTE] Email send-email route hit!');
  sendEmail(req, res);
});

// Routes
app.use('/api/whatsapp', whatsappRoutes);
app.use('/webhook', webhookRoutes);
app.use('/api/email', emailRoutes);

// Rota raiz para testar se o servidor está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

// Rota para listar todas as rotas (debug)
app.get('/debug/routes', (req, res) => {
  const routes: { method: string; path: string }[] = [];
  
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      routes.push({
        method: Object.keys(middleware.route.methods)[0].toUpperCase(),
        path: middleware.route.path
      });
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          routes.push({
            method: Object.keys(handler.route.methods)[0].toUpperCase(),
            path: middleware.regexp.toString()
              .replace('\\^', '')
              .replace('\\/?(?=\\/|$)', '')
              .replace(/\\\//g, '/') + handler.route.path
          });
        }
      });
    }
  });
  
  res.json({ routes });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 