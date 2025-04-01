
import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import DashboardPage from "@/pages/DashboardPage";
import ModelPage from "@/pages/ModelPage";
import ModelDetailPage from "@/pages/ModelDetailPage";
import ModelStudentPage from "@/pages/ModelStudentPage";
import UploadPage from "@/pages/UploadPage";
import BillingPage from "@/pages/BillingPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminUsersPage from "@/pages/AdminUsersPage";
import AdminPaymentsPage from "@/pages/AdminPaymentsPage";
import AdminPlansPage from "@/pages/AdminPlansPage";
import AdminApisPage from "@/pages/AdminApisPage";
import AdminDocsPage from "@/pages/AdminDocsPage";
import SettingsPage from "@/pages/SettingsPage";
import ProfilePage from "@/pages/ProfilePage";
import NotificationsPage from "@/pages/NotificationsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import OrganizationsPage from "@/pages/OrganizationsPage";
import OrganizationDetailsPage from "@/pages/OrganizationDetailsPage";
import LandingPage from "@/pages/LandingPage";
import RecruitmentDashboardPage from "@/pages/RecruitmentDashboardPage";
import RecruitmentLeadsPage from "@/pages/RecruitmentLeadsPage";
import RecruitmentFunnelPage from "@/pages/RecruitmentFunnelPage";
import RecruitmentAnalyticsPage from "@/pages/RecruitmentAnalyticsPage";
import RecruitmentCampaignsPage from "@/pages/RecruitmentCampaignsPage";
import EnrollmentPredictionsPage from "@/pages/recruitment/EnrollmentPredictionsPage";
import ConversationalAIPage from "@/pages/recruitment/ConversationalAIPage";

import { ProtectedRoutes } from "@/components/auth/ProtectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <ProtectedRoutes element={<HomePage />} />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoutes element={<DashboardPage />} />,
  },
  {
    path: "/model",
    element: <ProtectedRoutes element={<ModelPage />} />,
  },
  {
    path: "/model/:id",
    element: <ProtectedRoutes element={<ModelDetailPage />} />,
  },
  {
    path: "/model/student/:id",
    element: <ProtectedRoutes element={<ModelStudentPage />} />,
  },
  {
    path: "/upload",
    element: <ProtectedRoutes element={<UploadPage />} />,
  },
  {
    path: "/billing",
    element: <ProtectedRoutes element={<BillingPage />} />,
  },
  {
    path: "/admin",
    element: <ProtectedRoutes element={<AdminDashboardPage />} requireAdmin />,
  },
  {
    path: "/admin/users",
    element: <ProtectedRoutes element={<AdminUsersPage />} requireAdmin />,
  },
  {
    path: "/admin/payments",
    element: <ProtectedRoutes element={<AdminPaymentsPage />} requireAdmin />,
  },
  {
    path: "/admin/plans",
    element: <ProtectedRoutes element={<AdminPlansPage />} requireAdmin />,
  },
  {
    path: "/admin/apis",
    element: <ProtectedRoutes element={<AdminApisPage />} requireAdmin />,
  },
  {
    path: "/admin/docs",
    element: <ProtectedRoutes element={<AdminDocsPage />} requireAdmin />,
  },
  {
    path: "/settings",
    element: <ProtectedRoutes element={<SettingsPage />} />,
  },
  {
    path: "/profile",
    element: <ProtectedRoutes element={<ProfilePage />} />,
  },
  {
    path: "/notifications",
    element: <ProtectedRoutes element={<NotificationsPage />} />,
  },
  {
    path: "/organizations",
    element: <ProtectedRoutes element={<OrganizationsPage />} />,
  },
  {
    path: "/organizations/:id",
    element: <ProtectedRoutes element={<OrganizationDetailsPage />} />,
  },
  {
    path: "/recruitment",
    element: <ProtectedRoutes element={<RecruitmentDashboardPage />} />,
  },
  {
    path: "/recruitment/leads",
    element: <ProtectedRoutes element={<RecruitmentLeadsPage />} />,
  },
  {
    path: "/recruitment/funnel",
    element: <ProtectedRoutes element={<RecruitmentFunnelPage />} />,
  },
  {
    path: "/recruitment/analytics",
    element: <ProtectedRoutes element={<RecruitmentAnalyticsPage />} />,
  },
  {
    path: "/recruitment/campaigns",
    element: <ProtectedRoutes element={<RecruitmentCampaignsPage />} />,
  },
  {
    path: "/recruitment/predictions",
    element: <ProtectedRoutes element={<EnrollmentPredictionsPage />} />,
  },
  {
    path: "/recruitment/conversation",
    element: <ProtectedRoutes element={<ConversationalAIPage />} />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
