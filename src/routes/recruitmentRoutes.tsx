
import React from 'react';
import { RouteConfig } from './types';
import RecruitmentFunnelPage from '@/pages/RecruitmentFunnelPage';
import RecruitmentCampaignsPage from '@/pages/RecruitmentCampaignsPage';
import RecruitmentDocumentationPage from '@/pages/RecruitmentDocumentationPage';

const recruitmentRoutes: RouteConfig[] = [
  {
    path: '/recruitment/funnel',
    element: <RecruitmentFunnelPage />
  },
  {
    path: '/recruitment/campaigns',
    element: <RecruitmentCampaignsPage />
  },
  {
    path: '/recruitment/documentation',
    element: <RecruitmentDocumentationPage />
  }
];

export default recruitmentRoutes;
