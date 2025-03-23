
import React from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import StudentHeader from './StudentHeader';
import StudentTabsContent from './StudentTabsContent';
import StudentNotFound from './StudentNotFound';

const ModelStudentContent: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { students } = useData();
  
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
