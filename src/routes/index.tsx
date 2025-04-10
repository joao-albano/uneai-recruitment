
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { publicRoutes } from './publicRoutes';
import { protectedRoutes } from './protectedRoutes';
import { adminRoutes } from './adminRoutes';
import recruitmentRoutes from './recruitmentRoutes';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';

// Combine all routes
const allRoutes = [
  {
    path: '/',
    element: <Index />
  },
  ...publicRoutes,
  ...protectedRoutes,
  ...adminRoutes,
  ...recruitmentRoutes,
  {
    path: '*',
    element: <NotFound />
  }
];

const router = createBrowserRouter(allRoutes);

export default router;
