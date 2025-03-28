import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/auth';
import { ProductProvider } from './context/ProductContext';
import { StudentsProvider } from './context/students/StudentsContext';
import { AlertsProvider } from './context/alerts/AlertsContext';
import { WhatsAppProvider } from './context/whatsapp/WhatsAppContext';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminApiIntegrationsPage from './pages/AdminApiIntegrationsPage';
import AdminPlansPage from './pages/AdminPlansPage';
import SettingsPage from './pages/SettingsPage';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import ModelPage from './pages/ModelPage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';
import SurveysPage from './pages/SurveysPage';
import UploadPage from './pages/UploadPage';
import ComingSoonPage from './pages/ComingSoonPage';
import RecruitmentDashboardPage from './pages/RecruitmentDashboardPage';
import RecruitmentLeadsPage from './pages/RecruitmentLeadsPage';
import RecruitmentFunnelPage from './pages/RecruitmentFunnelPage';
import RecruitmentCampaignsPage from './pages/RecruitmentCampaignsPage';
import LeadConversationPage from './pages/recruitment/LeadConversationPage';
import EnrollmentPredictionsPage from './pages/recruitment/EnrollmentPredictionsPage';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ProductProvider>
            <StudentsProvider>
              <AlertsProvider>
                <WhatsAppProvider>
                  <Routes>
                    {/* Rotas de autenticação */}
                    <Route path="/login" element={<LoginPage />} />
                    
                    {/* Rotas administrativas */}
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/admin/integrations" element={<AdminApiIntegrationsPage />} />
                    <Route path="/admin/plans" element={<AdminPlansPage />} />
                    
                    {/* Rotas de configurações */}
                    <Route path="/settings" element={<SettingsPage />} />
                    
                    {/* Rotas do sistema */}
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/students" element={<StudentsPage />} />
                    <Route path="/model" element={<ModelPage />} />
                    <Route path="/alerts" element={<AlertsPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/surveys" element={<SurveysPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="/coming-soon" element={<ComingSoonPage />} />
                    
                    {/* Rotas do módulo de captação */}
                    <Route path="/recruitment" element={<RecruitmentDashboardPage />} />
                    <Route path="/recruitment/leads" element={<RecruitmentLeadsPage />} />
                    <Route path="/recruitment/funnel" element={<RecruitmentFunnelPage />} />
                    <Route path="/recruitment/campaigns" element={<RecruitmentCampaignsPage />} />
                    
                    {/* Adicionar novas rotas para o módulo de captação */}
                    <Route path="/recruitment/leads/:leadId" element={<LeadConversationPage />} />
                    <Route path="/recruitment/conversation" element={<ComingSoonPage />} />
                    <Route path="/recruitment/predictions" element={<EnrollmentPredictionsPage />} />
                    
                    {/* Rota "Em Construção" para páginas não implementadas */}
                    <Route path="*" element={<ComingSoonPage />} />
                  </Routes>
                </WhatsAppProvider>
              </AlertsProvider>
            </StudentsProvider>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
