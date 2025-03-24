
import React, { useEffect } from 'react';
import { StudentsProvider } from '@/context/students/StudentsContext';
import { SurveysProvider } from '@/context/surveys/SurveysContext';
import { AlertsProvider } from '@/context/alerts/AlertsContext';
import { WhatsAppProvider } from '@/context/whatsapp/WhatsAppContext';
import { AppStateProvider } from '@/context/app/AppStateContext';
import { SchedulesProvider } from '@/context/schedules/SchedulesContext';
import SurveyPageContent from '@/components/survey/SurveyPageContent';
import { Layout } from '@/components/layout/Layout';
import { generateDemoStudents } from '@/data/demoStudents';

const SurveyPage: React.FC = () => {
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
            <AppStateProvider>
              <WhatsAppProvider>
                <Layout>
                  <SurveyPageContent />
                </Layout>
              </WhatsAppProvider>
            </AppStateProvider>
          </SchedulesProvider>
        </AlertsProvider>
      </SurveysProvider>
    </StudentsProvider>
  );
};

export default SurveyPage;
