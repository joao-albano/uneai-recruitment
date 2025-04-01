
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { publicRoutes } from './publicRoutes';
import { protectedRoutes } from './protectedRoutes';
import { adminRoutes } from './adminRoutes';

// Import new routes for recruitment geographic targeting
import GeographicTargetingPage from '@/pages/recruitment/GeographicTargetingPage';
import ConversationPage from '@/pages/recruitment/ConversationPage';
import NotFound from '@/pages/NotFound';

// Combine all routes
const allRoutes = [
  ...publicRoutes,
  ...protectedRoutes,
  ...adminRoutes,
  {
    path: '/recruitment/geographic-targeting',
    element: <GeographicTargetingPage />
  },
  {
    path: '/recruitment/conversation',
    element: <ConversationPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

const router = createBrowserRouter(allRoutes);

export default router;
