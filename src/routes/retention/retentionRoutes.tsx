
import { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoutes";
import { ProductGuard } from "@/components/auth/ProductGuard";
import DashboardPage from "@/pages/DashboardPage";
import ModelPage from "@/pages/ModelPage";
import ModelStudentPage from "@/pages/ModelStudentPage";
import UploadPage from "@/pages/UploadPage";
import AlertsPage from "@/pages/AlertsPage";
import SurveyPage from "@/pages/SurveyPage";
import SchedulePage from "@/pages/SchedulePage";
import StudentsPage from "@/pages/StudentsPage";
import Index from "@/pages/Index";

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const retentionRoutes: RouteConfig[] = [
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <ProductGuard allowedProduct="retention" redirectTo="/hub">
          <Index />
        </ProductGuard>
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
  }
];
