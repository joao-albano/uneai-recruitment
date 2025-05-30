
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { DataProvider } from '@/context/DataContext';
import ModelStudentContent from '@/components/model/student/ModelStudentContent';
import { useParams } from 'react-router-dom';

const ModelStudentPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  
  // Log do ID do aluno para depuração
  useEffect(() => {
    console.log('Student ID from URL:', studentId);
  }, [studentId]);
  
  return (
    <DataProvider>
      <Layout 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      >
        <ModelStudentContent studentId={studentId} />
      </Layout>
    </DataProvider>
  );
};

export default ModelStudentPage;
