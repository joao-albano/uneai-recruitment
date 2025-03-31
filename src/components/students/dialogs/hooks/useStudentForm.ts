
import { useState } from 'react';
import { Student, SchoolSegment } from '@/types/data';
import { v4 as uuidv4 } from 'uuid';

export const useStudentForm = (onCreateSuccess: (student: Student) => void) => {
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    registrationNumber: '',
    class: '',
    segment: 'ENSINO FUNDAMENTAL II' as SchoolSegment,
    grade: 6,
    attendance: 100,
    behavior: 100,
    riskLevel: 'low',
    parentName: '',
    parentContact: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudent(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setNewStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGradeChange = (value: string) => {
    setNewStudent(prev => ({
      ...prev,
      grade: parseInt(value)
    }));
  };
  
  const handleNumberInputChange = (field: string, value: number) => {
    setNewStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Criar novo estudante com ID e valores padrão para campos opcionais
    const student: Student = {
      id: uuidv4(),
      name: newStudent.name || '',
      registrationNumber: newStudent.registrationNumber || '',
      class: newStudent.class || '',
      segment: newStudent.segment as SchoolSegment,
      grade: newStudent.grade || 6,
      attendance: newStudent.attendance || 100,
      behavior: newStudent.behavior || 100,
      riskLevel: newStudent.riskLevel as 'low' | 'medium' | 'high',
      parentName: newStudent.parentName,
      parentContact: newStudent.parentContact
    };
    
    onCreateSuccess(student);
    
    // Resetar o formulário
    setNewStudent({
      name: '',
      registrationNumber: '',
      class: '',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 6,
      attendance: 100,
      behavior: 100,
      riskLevel: 'low',
      parentName: '',
      parentContact: ''
    });
  };

  return {
    newStudent,
    handleInputChange,
    handleSelectChange,
    handleGradeChange,
    handleNumberInputChange,
    handleSubmit
  };
};
