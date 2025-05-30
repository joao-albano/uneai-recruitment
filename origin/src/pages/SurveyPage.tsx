
import React, { useEffect } from 'react';
import { StudentsProvider } from '@/context/students/StudentsContext';
import { SurveysProvider } from '@/context/surveys/SurveysContext';
import { AlertsProvider } from '@/context/alerts/AlertsContext';
import { WhatsAppProvider } from '@/context/whatsapp/WhatsAppContext';
import { AppStateProvider } from '@/context/app/AppStateContext';
import { SchedulesProvider } from '@/context/schedules/SchedulesContext';
import { UploadsProvider } from '@/context/uploads/UploadsContext';
import SurveyPageContent from '@/components/survey/SurveyPageContent';
import Layout from '@/components/layout/Layout';
import { generateDemoStudents } from '@/data/demoStudents';

const SurveyPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  
  // Pré-carregar os dados de demonstração no localStorage para garantir que estejam disponíveis
  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (!storedStudents) {
      const demoStudents = generateDemoStudents();
      localStorage.setItem('students', JSON.stringify(demoStudents));
    }
  }, []);

  return (
    <StudentsProvider>
      <SurveysProvider>
        <AlertsProvider>
          <SchedulesProvider>
            <UploadsProvider>
              <AppStateProvider>
                <WhatsAppProvider>
                  <Layout 
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    sidebarCollapsed={sidebarCollapsed}
                    setSidebarCollapsed={setSidebarCollapsed}
                  >
                    <SurveyPageContent />
                  </Layout>
                </WhatsAppProvider>
              </AppStateProvider>
            </UploadsProvider>
          </SchedulesProvider>
        </AlertsProvider>
      </SurveysProvider>
    </StudentsProvider>
  );
};

export default SurveyPage;
