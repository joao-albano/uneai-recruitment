
import { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoutes";
import ProductHubPage from "@/pages/ProductHubPage";
import DashboardPage from "@/pages/DashboardPage";
import UploadPage from "@/pages/UploadPage";
import AlertsPage from "@/pages/AlertsPage";
import SurveyPage from "@/pages/SurveyPage";
import SchedulePage from "@/pages/SchedulePage";
import StudentsPage from "@/pages/StudentsPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import Index from "@/pages/Index";
import ModelPage from "@/pages/ModelPage";
import ModelStudentPage from "@/pages/ModelStudentPage";
import UserBillingPage from "@/pages/UserBillingPage";
import RecruitmentDashboardPage from "@/pages/RecruitmentDashboardPage";
import RecruitmentLeadsPage from "@/pages/RecruitmentLeadsPage";
import RecruitmentFunnelPage from "@/pages/RecruitmentFunnelPage";
import RecruitmentCampaignsPage from "@/pages/RecruitmentCampaignsPage";
import RecruitmentAnalyticsPage from "@/pages/RecruitmentAnalyticsPage";
import ConversationPage from "@/pages/recruitment/ConversationPage";
import { ProductGuard } from "@/components/auth/ProductGuard";

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const protectedRoutes: RouteConfig[] = [
  {
    path: "/hub",
    element: (
      <ProtectedRoute>
        <ProductHubPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/model",
    element: (
      <ProtectedRoute>
        <ModelPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/model/student/:studentId",
    element: (
      <ProtectedRoute>
        <ModelStudentPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/upload",
    element: (
      <ProtectedRoute>
        <UploadPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/alerts",
    element: (
      <ProtectedRoute>
        <ProductGuard allowedProduct="retention" redirectTo="/hub">
          <AlertsPage />
        </ProductGuard>
      </ProtectedRoute>
    )
  },
  {
    path: "/survey",
    element: (
      <ProtectedRoute>
        <SurveyPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/schedule",
    element: (
      <ProtectedRoute>
        <SchedulePage />
      </ProtectedRoute>
    )
  },
  {
    path: "/students",
    element: (
      <ProtectedRoute>
        <StudentsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    )
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/user-billing",
    element: (
      <ProtectedRoute>
        <UserBillingPage />
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
  }
];
