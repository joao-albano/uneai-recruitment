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
import LeadConversationPage from "@/pages/recruitment/LeadConversationPage";
import EnrollmentPredictionsPage from "@/pages/recruitment/EnrollmentPredictionsPage";
import RecruitmentAlertsPage from "@/pages/recruitment/RecruitmentAlertsPage";
import RecruitmentSchedulePage from "@/pages/recruitment/RecruitmentSchedulePage";
import DetailedAnalysisPage from "@/pages/recruitment/DetailedAnalysisPage";
import VoiceConfigurationPage from "@/pages/VoiceConfigurationPage";
import GeographicTargetingPage from "@/pages/recruitment/GeographicTargetingPage";
import CampusManagementPage from "@/pages/recruitment/CampusManagementPage";
import OmnichannelReportPage from "@/pages/recruitment/OmnichannelReportPage";
import RecruitmentUploadPage from "@/pages/recruitment/RecruitmentUploadPage";
import DialingRulesPage from "@/pages/recruitment/DialingRulesPage";
import GoalsConfigPage from "@/pages/recruitment/GoalsConfigPage";
import PeriodsConfigPage from "@/pages/recruitment/PeriodsConfigPage";
import RecruitmentDocumentationPage from "@/pages/RecruitmentDocumentationPage";
import RecruitmentArchitecturePage from "@/pages/RecruitmentArchitecturePage";

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const recruitmentRoutes: RouteConfig[] = [
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
    element: (
      <ProtectedRoute>
        <ProductGuard allowedProduct="recruitment" redirectTo="/hub">
          <RecruitmentDocumentationPage />
        </ProductGuard>
      </ProtectedRoute>
    )
  },
  {
    path: '/recruitment/architecture',
    element: (
      <ProtectedRoute>
        <ProductGuard allowedProduct="recruitment" redirectTo="/hub">
          <RecruitmentArchitecturePage />
        </ProductGuard>
      </ProtectedRoute>
    )
  }
];
