
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
import { ProtectedRoute, AdminRoute } from "@/components/auth/ProtectedRoutes";
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
    element: <ProtectedRoute><Index /></ProtectedRoute>,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><DashboardPage /></ProtectedRoute>,
  },
  {
    path: "/model",
    element: <ProtectedRoute><ModelPage /></ProtectedRoute>,
  },
  {
    path: "/model/:id",
    element: <ProtectedRoute><ComingSoonPage /></ProtectedRoute>,
  },
  {
    path: "/model/student/:id",
    element: <ProtectedRoute><ModelStudentPage /></ProtectedRoute>,
  },
  {
    path: "/upload",
    element: <ProtectedRoute><UploadPage /></ProtectedRoute>,
  },
  {
    path: "/billing",
    element: <ProtectedRoute><ComingSoonPage /></ProtectedRoute>,
  },
  {
    path: "/admin",
    element: <AdminRoute><AdminDashboardPage /></AdminRoute>,
  },
  {
    path: "/admin/users",
    element: <AdminRoute><UsersPage /></AdminRoute>,
  },
  {
    path: "/admin/payments",
    element: <AdminRoute><AdminPaymentsPage /></AdminRoute>,
  },
  {
    path: "/admin/plans",
    element: <AdminRoute><AdminPlansPage /></AdminRoute>,
  },
  {
    path: "/admin/apis",
    element: <AdminRoute><ComingSoonPage /></AdminRoute>,
  },
  {
    path: "/admin/docs",
    element: <AdminRoute><AdminDocsPage /></AdminRoute>,
  },
  {
    path: "/settings",
    element: <ProtectedRoute><SettingsPage /></ProtectedRoute>,
  },
  {
    path: "/profile",
    element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
  },
  {
    path: "/notifications",
    element: <ProtectedRoute><ComingSoonPage /></ProtectedRoute>,
  },
  {
    path: "/organizations",
    element: <ProtectedRoute><OrganizationsPage /></ProtectedRoute>,
  },
  {
    path: "/organizations/:id",
    element: <ProtectedRoute><ComingSoonPage /></ProtectedRoute>,
  },
  {
    path: "/hub",
    element: <ProtectedRoute><ProductHubPage /></ProtectedRoute>,
  },
  {
    path: "/pricing",
    element: <PricingPage />,
  },
  {
    path: "/recruitment",
    element: <ProtectedRoute><RecruitmentDashboardPage /></ProtectedRoute>,
  },
  {
    path: "/recruitment/leads",
    element: <ProtectedRoute><RecruitmentLeadsPage /></ProtectedRoute>,
  },
  {
    path: "/recruitment/funnel",
    element: <ProtectedRoute><RecruitmentFunnelPage /></ProtectedRoute>,
  },
  {
    path: "/recruitment/analytics",
    element: <ProtectedRoute><RecruitmentAnalyticsPage /></ProtectedRoute>,
  },
  {
    path: "/recruitment/campaigns",
    element: <ProtectedRoute><RecruitmentCampaignsPage /></ProtectedRoute>,
  },
  {
    path: "/recruitment/predictions",
    element: <ProtectedRoute><EnrollmentPredictionsPage /></ProtectedRoute>,
  },
  {
    path: "/recruitment/conversation",
    element: <ProtectedRoute><ConversationalAIPage /></ProtectedRoute>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
