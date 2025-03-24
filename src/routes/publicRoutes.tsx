
import { ReactNode } from "react";
import LoginPage from "@/pages/LoginPage";
import PricingPage from "@/pages/PricingPage";

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const publicRoutes: RouteConfig[] = [
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/pricing",
    element: <PricingPage />
  }
];
