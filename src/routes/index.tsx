
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ModelPage from "@/pages/ModelPage";
import ModelStudentPage from "@/pages/ModelStudentPage";
import UploadPage from "@/pages/UploadPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminPaymentsPage from "@/pages/AdminPaymentsPage";
import AdminPlansPage from "@/pages/AdminPlansPage";
import AdminDocsPage from "@/pages/AdminDocsPage";
import SettingsPage from "@/pages/SettingsPage";
import ProfilePage from "@/pages/ProfilePage";
import OrganizationsPage from "@/pages/OrganizationsPage";
import RecruitmentDashboardPage from "@/pages/RecruitmentDashboardPage";
import RecruitmentLeadsPage from "@/pages/RecruitmentLeadsPage";
import RecruitmentFunnelPage from "@/pages/RecruitmentFunnelPage";
import RecruitmentAnalyticsPage from "@/pages/RecruitmentAnalyticsPage";
import RecruitmentCampaignsPage from "@/pages/RecruitmentCampaignsPage";
import EnrollmentPredictionsPage from "@/pages/recruitment/EnrollmentPredictionsPage";
import ConversationalAIPage from "@/pages/recruitment/ConversationalAIPage";
import { ProtectedRoute as ProtectedRoutes } from "@/components/auth/ProtectedRoutes";
import Index from "@/pages/Index";
import ComingSoonPage from "@/pages/ComingSoonPage";
import UsersPage from "@/pages/UsersPage";
import ProductHubPage from "@/pages/ProductHubPage";
import PricingPage from "@/pages/PricingPage";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/signup",
    element: <LoginPage />, // Using LoginPage as it has signup functionality
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <ProtectedRoutes><Index /></ProtectedRoutes>,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoutes><DashboardPage /></ProtectedRoutes>,
  },
  {
    path: "/model",
    element: <ProtectedRoutes><ModelPage /></ProtectedRoutes>,
  },
  {
    path: "/model/:id",
    element: <ProtectedRoutes><ComingSoonPage /></ProtectedRoutes>,
  },
  {
    path: "/model/student/:id",
    element: <ProtectedRoutes><ModelStudentPage /></ProtectedRoutes>,
  },
  {
    path: "/upload",
    element: <ProtectedRoutes><UploadPage /></ProtectedRoutes>,
  },
  {
    path: "/billing",
    element: <ProtectedRoutes><ComingSoonPage /></ProtectedRoutes>,
  },
  {
    path: "/admin",
    element: <ProtectedRoutes requireAdmin><AdminDashboardPage /></ProtectedRoutes>,
  },
  {
    path: "/admin/users",
    element: <ProtectedRoutes requireAdmin><UsersPage /></ProtectedRoutes>,
  },
  {
    path: "/admin/payments",
    element: <ProtectedRoutes requireAdmin><AdminPaymentsPage /></ProtectedRoutes>,
  },
  {
    path: "/admin/plans",
    element: <ProtectedRoutes requireAdmin><AdminPlansPage /></ProtectedRoutes>,
  },
  {
    path: "/admin/apis",
    element: <ProtectedRoutes requireAdmin><ComingSoonPage /></ProtectedRoutes>,
  },
  {
    path: "/admin/docs",
    element: <ProtectedRoutes requireAdmin><AdminDocsPage /></ProtectedRoutes>,
  },
  {
    path: "/settings",
    element: <ProtectedRoutes><SettingsPage /></ProtectedRoutes>,
  },
  {
    path: "/profile",
    element: <ProtectedRoutes><ProfilePage /></ProtectedRoutes>,
  },
  {
    path: "/notifications",
    element: <ProtectedRoutes><ComingSoonPage /></ProtectedRoutes>,
  },
  {
    path: "/organizations",
    element: <ProtectedRoutes><OrganizationsPage /></ProtectedRoutes>,
  },
  {
    path: "/organizations/:id",
    element: <ProtectedRoutes><ComingSoonPage /></ProtectedRoutes>,
  },
  {
    path: "/hub",
    element: <ProtectedRoutes><ProductHubPage /></ProtectedRoutes>,
  },
  {
    path: "/pricing",
    element: <PricingPage />,
  },
  {
    path: "/recruitment",
    element: <ProtectedRoutes><RecruitmentDashboardPage /></ProtectedRoutes>,
  },
  {
    path: "/recruitment/leads",
    element: <ProtectedRoutes><RecruitmentLeadsPage /></ProtectedRoutes>,
  },
  {
    path: "/recruitment/funnel",
    element: <ProtectedRoutes><RecruitmentFunnelPage /></ProtectedRoutes>,
  },
  {
    path: "/recruitment/analytics",
    element: <ProtectedRoutes><RecruitmentAnalyticsPage /></ProtectedRoutes>,
  },
  {
    path: "/recruitment/campaigns",
    element: <ProtectedRoutes><RecruitmentCampaignsPage /></ProtectedRoutes>,
  },
  {
    path: "/recruitment/predictions",
    element: <ProtectedRoutes><EnrollmentPredictionsPage /></ProtectedRoutes>,
  },
  {
    path: "/recruitment/conversation",
    element: <ProtectedRoutes><ConversationalAIPage /></ProtectedRoutes>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
