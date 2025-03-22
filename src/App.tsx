
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import AlertsPage from "./pages/AlertsPage";
import SurveyPage from "./pages/SurveyPage";
import SchedulePage from "./pages/SchedulePage";
import StudentsPage from "./pages/StudentsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// In a real app, this would be handled with a proper auth provider
const isAuthenticated = () => {
  // This is just a mock implementation - in a real app this would 
  // check a token in localStorage or cookies
  return true;
};

// In a real app, this would come from authentication state
const isAdmin = () => {
  // This is just a mock implementation - in a real app this would
  // check user roles from a token or user data
  return true;
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

// Admin route component - only accessible to admins
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  // First check if authenticated, then check if admin
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  // If authenticated but not admin, redirect to dashboard
  return isAdmin() ? <>{children}</> : <Navigate to="/dashboard" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          
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
          
          {/* Admin Routes - Only accessible to admin users */}
          <Route 
            path="/settings" 
            element={
              <AdminRoute>
                <SettingsPage />
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
  </QueryClientProvider>
);

export default App;
