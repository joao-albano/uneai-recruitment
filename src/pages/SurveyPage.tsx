
import React from 'react';
import { DataProvider } from '@/context/DataContext';
import SurveyPageContent from '@/components/survey/SurveyPageContent';
import { Layout } from '@/components/layout/Layout';

const SurveyPage: React.FC = () => {
  return (
    <DataProvider>
      <Layout>
        <SurveyPageContent />
      </Layout>
    </DataProvider>
  );
};

export default SurveyPage;
