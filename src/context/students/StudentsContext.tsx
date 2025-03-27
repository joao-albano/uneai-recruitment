
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StudentData } from '@/types/data';

interface StudentsContextType {
  students: StudentData[];
  setStudents: (students: StudentData[]) => void;
  addStudent: (student: StudentData) => void;
  updateStudent: (student: StudentData) => void;
  deleteStudent: (id: string) => void;
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

export const StudentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<StudentData[]>([]);

  const addStudent = (student: StudentData) => {
    setStudents(prev => [...prev, student]);
  };
  
  const updateStudent = (student: StudentData) => {
    setStudents(prev => 
      prev.map(s => s.id === student.id ? student : s)
    );
  };
  
  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  return (
    <StudentsContext.Provider value={{
      students,
      setStudents,
      addStudent,
      updateStudent,
      deleteStudent
    }}>
      {children}
    </StudentsContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentsContext);
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentsProvider');
  }
  return context;
};
