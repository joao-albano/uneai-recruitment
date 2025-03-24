
import React from 'react';
import { DataProvider } from '@/context/DataContext';
import { WhatsAppProvider } from '@/context/whatsapp/WhatsAppContext';
import SurveyPageContent from '@/components/survey/SurveyPageContent';
import { Layout } from '@/components/layout/Layout';

const SurveyPage: React.FC = () => {
  return (
    <DataProvider>
      <WhatsAppProvider>
        <Layout>
          <SurveyPageContent />
        </Layout>
      </WhatsAppProvider>
    </DataProvider>
  );
};

export default SurveyPage;
