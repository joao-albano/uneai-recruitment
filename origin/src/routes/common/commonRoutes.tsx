
import { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoutes";
import ProductHubPage from "@/pages/ProductHubPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import UserBillingPage from "@/pages/UserBillingPage";

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const commonRoutes: RouteConfig[] = [
  {
    path: "/hub",
    element: (
      <ProtectedRoute>
        <ProductHubPage />
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
  }
];
