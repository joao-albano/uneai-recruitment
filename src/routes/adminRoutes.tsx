
import { ReactNode } from "react";
import { AdminRoute } from "@/components/auth/ProtectedRoutes";
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
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoute>
        <AdminDashboardPage />
      </AdminRoute>
    )
  },
  {
    path: "/admin/settings",
    element: (
      <AdminRoute>
        <AdminSettingsPage />
      </AdminRoute>
    )
  },
  {
    path: "/admin/payments",
    element: (
      <AdminRoute>
        <AdminPaymentsPage />
      </AdminRoute>
    )
  },
  {
    path: "/admin/plans",
    element: (
      <AdminRoute>
        <AdminPlansPage />
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
  }
];
