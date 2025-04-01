
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import publicRoutes from './publicRoutes';
import protectedRoutes from './protectedRoutes';
import adminRoutes from './adminRoutes';

// Import new routes for recruitment geographic targeting
import GeographicTargetingPage from '@/pages/recruitment/GeographicTargetingPage';

// Combine all routes
const allRoutes = [
  ...publicRoutes,
  ...protectedRoutes,
  ...adminRoutes,
  {
    path: '/recruitment/geographic-targeting',
    element: <GeographicTargetingPage />
  }
];

const router = createBrowserRouter(allRoutes);

export default router;
