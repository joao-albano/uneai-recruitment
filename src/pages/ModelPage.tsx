
import React from 'react';
import { DataProvider } from '@/context/DataContext';
import ModelPageContent from '@/components/model/ModelPageContent';
import Layout from '@/components/layout/Layout';

// Main component that wraps the content with DataProvider
const ModelPage: React.FC = () => {
  return (
    <DataProvider>
      <Layout>
        <ModelPageContent />
      </Layout>
    </DataProvider>
  );
};

export default ModelPage;
