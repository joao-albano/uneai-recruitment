
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StudentData } from '@/types/data';

interface StudentsContextType {
  students: StudentData[];
  setStudents: (students: StudentData[]) => void;
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

export const StudentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<StudentData[]>([]);

  const value = {
    students,
    setStudents,
  };

  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
};

export const useStudents = () => {
  const context = useContext(StudentsContext);
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentsProvider');
  }
  return context;
};
