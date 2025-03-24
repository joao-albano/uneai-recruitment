
import React from 'react';
import { StudentsProvider } from '@/context/students/StudentsContext';
import { SurveysProvider } from '@/context/surveys/SurveysContext';
import { AlertsProvider } from '@/context/alerts/AlertsContext';
import { WhatsAppProvider } from '@/context/whatsapp/WhatsAppContext';
import SurveyPageContent from '@/components/survey/SurveyPageContent';
import { Layout } from '@/components/layout/Layout';

const SurveyPage: React.FC = () => {
  return (
    <StudentsProvider>
      <SurveysProvider>
        <AlertsProvider>
          <WhatsAppProvider>
            <Layout>
              <SurveyPageContent />
            </Layout>
          </WhatsAppProvider>
        </AlertsProvider>
      </SurveysProvider>
    </StudentsProvider>
  );
};

export default SurveyPage;
