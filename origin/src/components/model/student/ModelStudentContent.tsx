
import React, { useEffect } from 'react';
import { useData } from '@/context/DataContext';
import StudentHeader from './StudentHeader';
import StudentTabsContent from './StudentTabsContent';
import StudentNotFound from './StudentNotFound';

interface ModelStudentContentProps {
  studentId?: string;
}

const ModelStudentContent: React.FC<ModelStudentContentProps> = ({ studentId }) => {
  const { students, generateDemoData } = useData();
  
  // Garante que temos dados para exibir
  useEffect(() => {
    if (students.length === 0) {
      generateDemoData();
    }
  }, [students.length, generateDemoData]);
  
  const student = students.find(s => s.id === studentId);
  
  if (!student) {
    return <StudentNotFound />;
  }
  
  return (
    <div className="space-y-6">
      <StudentHeader student={student} />
      <StudentTabsContent student={student} />
    </div>
  );
};

export default ModelStudentContent;
