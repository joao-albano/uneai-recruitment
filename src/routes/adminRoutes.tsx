
import { ReactNode } from "react";
import { AdminRoute, SuperAdminRoute } from "@/components/auth/ProtectedRoutes";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminSettingsPage from "@/pages/AdminSettingsPage";
import AdminPaymentsPage from "@/pages/AdminPaymentsPage";
import AdminPlansPage from "@/pages/AdminPlansPage";
import UsersPage from "@/pages/UsersPage";

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const adminRoutes: RouteConfig[] = [
  // Rotas acessíveis para todos os admins (tanto super quanto escola)
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoute>
        <AdminDashboardPage />
      </AdminRoute>
    )
  },
  {
    path: "/users",
    element: (
      <AdminRoute>
        <UsersPage />
      </AdminRoute>
    )
  },
  
  // Rotas acessíveis apenas para super admins (UNE CX)
  {
    path: "/admin/settings",
    element: (
      <SuperAdminRoute>
        <AdminSettingsPage />
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
  }
];
