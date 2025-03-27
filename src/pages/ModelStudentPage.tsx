
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { DataProvider } from '@/context/DataContext';
import ModelStudentContent from '@/components/model/student/ModelStudentContent';
import { useParams } from 'react-router-dom';

const ModelStudentPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  
  // Log do ID do aluno para depuração
  useEffect(() => {
    console.log('Student ID from URL:', studentId);
  }, [studentId]);
  
  return (
    <DataProvider>
      <Layout>
        <ModelStudentContent studentId={studentId} />
      </Layout>
    </DataProvider>
  );
};

export default ModelStudentPage;
