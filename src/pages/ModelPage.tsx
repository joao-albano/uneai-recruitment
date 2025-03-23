
import React from 'react';
import { DataProvider } from '@/context/DataContext';
import ModelPageContent from '@/components/model/ModelPageContent';

// Main component that wraps the content with DataProvider
const ModelPage: React.FC = () => {
  return (
    <DataProvider>
      <ModelPageContent />
    </DataProvider>
  );
};

export default ModelPage;
