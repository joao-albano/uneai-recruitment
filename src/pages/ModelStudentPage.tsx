
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { DataProvider } from '@/context/DataContext';
import ModelStudentContent from '@/components/model/student/ModelStudentContent';

const ModelStudentPage: React.FC = () => {
  return (
    <DataProvider>
      <Layout>
        <ModelStudentContent />
      </Layout>
    </DataProvider>
  );
};

export default ModelStudentPage;
