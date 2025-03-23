
import React from 'react';
import { DataProvider } from '@/context/DataContext';
import SurveyPageContent from '@/components/survey/SurveyPageContent';

const SurveyPage: React.FC = () => {
  return (
    <DataProvider>
      <SurveyPageContent />
    </DataProvider>
  );
};

export default SurveyPage;
