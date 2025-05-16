import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import whatsappRoutes from './api/routes/whatsapp.routes';
import webhookRoutes from './api/routes/webhook.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/whatsapp', whatsappRoutes);
app.use('/webhook', webhookRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 