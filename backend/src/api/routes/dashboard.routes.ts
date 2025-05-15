import { Router } from 'express';
import { getDashboardOverview } from '../controllers/dashboard.controller';

const router = Router();

// GET /api/dashboard/overview
router.get('/overview', getDashboardOverview);

export default router; 
 
 
 
 