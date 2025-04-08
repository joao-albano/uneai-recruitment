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
    path: "/recruitment/alerts",
    element: (
      <ProtectedRoute>
        <RecruitmentAlertsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/recruitment/schedule",
    element: (
      <ProtectedRoute>
        <RecruitmentSchedulePage />
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
    path: "/recruitment/detailed-analysis",
    element: (
      <ProtectedRoute>
        <DetailedAnalysisPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/recruitment/voice-config",
    element: (
      <ProtectedRoute>
        <VoiceConfigurationPage />
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
    path: "/recruitment/conversation/:leadId",
    element: (
      <ProtectedRoute>
        <LeadConversationPage />
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
    path: "/recruitment/geographic-targeting",
    element: (
      <ProtectedRoute>
        <GeographicTargetingPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/recruitment/campus",
    element: (
      <ProtectedRoute>
        <CampusManagementPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/recruitment/omnichannel-report",
    element: (
      <ProtectedRoute>
        <OmnichannelReportPage />
      </ProtectedRoute>
    )
  }
];
