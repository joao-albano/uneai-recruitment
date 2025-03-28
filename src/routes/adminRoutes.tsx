
import { ReactNode } from "react";
import { AdminRoute, SuperAdminRoute } from "@/components/auth/ProtectedRoutes";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminSettingsPage from "@/pages/AdminSettingsPage";
import AdminPaymentsPage from "@/pages/AdminPaymentsPage";
import AdminPlansPage from "@/pages/AdminPlansPage";
import UsersPage from "@/pages/UsersPage";
import OrganizationsPage from "@/pages/OrganizationsPage";
import AdminApisReportPage from "@/pages/AdminApisReportPage";

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const adminRoutes: RouteConfig[] = [
  // Rotas acessíveis para todos os admins (tanto super quanto escola)
  {
    path: "/users",
    element: (
      <AdminRoute>
        <UsersPage />
      </AdminRoute>
    )
  },
  
  // Configurações do sistema - acessível para todos os admins
  {
    path: "/admin/settings",
    element: (
      <AdminRoute>
        <AdminSettingsPage />
      </AdminRoute>
    )
  },
  
  // Rotas acessíveis apenas para super admins (UNE CX)
  {
    path: "/admin/dashboard",
    element: (
      <SuperAdminRoute>
        <AdminDashboardPage />
      </SuperAdminRoute>
    )
  },
  {
    path: "/admin/organizations",
    element: (
      <SuperAdminRoute>
        <OrganizationsPage />
      </SuperAdminRoute>
    )
  },
  {
    path: "/admin/payments",
    element: (
      <SuperAdminRoute>
        <AdminPaymentsPage />
      </SuperAdminRoute>
    )
  },
  {
    path: "/admin/plans",
    element: (
      <SuperAdminRoute>
        <AdminPlansPage />
      </SuperAdminRoute>
    )
  },
  {
    path: "/admin/apis",
    element: (
      <SuperAdminRoute>
        <AdminApisReportPage />
      </SuperAdminRoute>
    )
  }
];
