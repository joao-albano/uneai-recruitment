
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { publicRoutes } from './publicRoutes';
import { protectedRoutes } from './protectedRoutes';
import { adminRoutes } from './adminRoutes';

// Import new routes for recruitment geographic targeting
import GeographicTargetingPage from '@/pages/recruitment/GeographicTargetingPage';
import ConversationPage from '@/pages/recruitment/ConversationPage';
import EnrollmentPredictionsPage from '@/pages/recruitment/EnrollmentPredictionsPage';
import PredictiveReportingPage from '@/pages/recruitment/PredictiveReportingPage';
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
  {
    path: '/recruitment/geographic-targeting',
    element: <GeographicTargetingPage />
  },
  {
    path: '/recruitment/conversation',
    element: <ConversationPage />
  },
  {
    path: '/recruitment/predictions',
    element: <EnrollmentPredictionsPage />
  },
  {
    path: '/recruitment/predictive-reporting',
    element: <PredictiveReportingPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

const router = createBrowserRouter(allRoutes);

export default router;
