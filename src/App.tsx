
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, AdminRoute } from "./components/auth/ProtectedRoutes";

import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import AlertsPage from "./pages/AlertsPage";
import SurveyPage from "./pages/SurveyPage";
import SchedulePage from "./pages/SchedulePage";
import StudentsPage from "./pages/StudentsPage";
import SettingsPage from "./pages/SettingsPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";
import ModelPage from "./pages/ModelPage";
import PricingPage from "./pages/PricingPage";
import UserBillingPage from "./pages/UserBillingPage";
import AdminPaymentsPage from "./pages/AdminPaymentsPage";
import NotFound from "./pages/NotFound";
import ModelStudentPage from "./pages/ModelStudentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Redirect root to login if not authenticated, otherwise to index */}
              <Route path="/" element={<Navigate to="/login" />} />
              
              {/* Public route - LoginPage */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Public route - PricingPage */}
              <Route path="/pricing" element={<PricingPage />} />
              
              {/* Protected route - Index (landing page) */}
              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/model" 
                element={
                  <ProtectedRoute>
                    <ModelPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/model/student/:studentId" 
                element={
                  <ProtectedRoute>
                    <ModelStudentPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/upload" 
                element={
                  <ProtectedRoute>
                    <UploadPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/alerts" 
                element={
                  <ProtectedRoute>
                    <AlertsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/survey" 
                element={
                  <ProtectedRoute>
                    <SurveyPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/schedule" 
                element={
                  <ProtectedRoute>
                    <SchedulePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/students" 
                element={
                  <ProtectedRoute>
                    <StudentsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user-billing" 
                element={
                  <ProtectedRoute>
                    <UserBillingPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Routes - Only accessible to admin users */}
              <Route 
                path="/admin/settings" 
                element={
                  <AdminRoute>
                    <AdminSettingsPage />
                  </AdminRoute>
                } 
              />
              <Route 
                path="/admin/dashboard" 
                element={
                  <AdminRoute>
                    <AdminDashboardPage />
                  </AdminRoute>
                } 
              />
              <Route 
                path="/admin/payments" 
                element={
                  <AdminRoute>
                    <AdminPaymentsPage />
                  </AdminRoute>
                } 
              />
              <Route 
                path="/users" 
                element={
                  <AdminRoute>
                    <UsersPage />
                  </AdminRoute>
                } 
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
