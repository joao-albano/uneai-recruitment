
import { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoutes";
import { ProductGuard } from "@/components/auth/ProductGuard";
import RecruitmentDashboardPage from "@/pages/RecruitmentDashboardPage";
import RecruitmentLeadsPage from "@/pages/RecruitmentLeadsPage";
import RecruitmentFunnelPage from "@/pages/RecruitmentFunnelPage";
import RecruitmentCampaignsPage from "@/pages/RecruitmentCampaignsPage";
import RecruitmentAnalyticsPage from "@/pages/RecruitmentAnalyticsPage";
import RecruitmentHomePage from "@/pages/recruitment/RecruitmentHomePage";
import ConversationPage from "@/pages/recruitment/ConversationPage";
import EnrollmentPredictionsPage from "@/pages/recruitment/EnrollmentPredictionsPage";
import PredictiveReportingPage from "@/pages/recruitment/PredictiveReportingPage";

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const recruitmentRoutes: RouteConfig[] = [
  {
    path: "/recruitment/home",
    element: (
      <ProtectedRoute>
        <ProductGuard allowedProduct="recruitment" redirectTo="/hub">
          <RecruitmentHomePage />
        </ProductGuard>
      </ProtectedRoute>
    )
  },
  {
    path: "/recruitment",
    element: (
      <ProtectedRoute>
        <RecruitmentDashboardPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/recruitment/leads",
    element: (
      <ProtectedRoute>
        <RecruitmentLeadsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/recruitment/funnel",
    element: (
      <ProtectedRoute>
        <RecruitmentFunnelPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/recruitment/campaigns",
    element: (
      <ProtectedRoute>
        <RecruitmentCampaignsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/recruitment/analytics",
    element: (
      <ProtectedRoute>
        <RecruitmentAnalyticsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/recruitment/conversation",
    element: (
      <ProtectedRoute>
        <ConversationPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/recruitment/predictions",
    element: (
      <ProtectedRoute>
        <EnrollmentPredictionsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/recruitment/predictive-reporting",
    element: (
      <ProtectedRoute>
        <PredictiveReportingPage />
      </ProtectedRoute>
    )
  }
];
