
import { useState, useEffect } from 'react';
import { Student } from '@/types/data';

export const useStudentEditForm = (
  student: Student | null,
  onUpdate: (student: Student) => void
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableStudent, setEditableStudent] = useState<Student | null>(null);

  // Reset state when dialog opens with a new student
  useEffect(() => {
    if (student) {
      setEditableStudent(structuredClone(student));
      setIsEditing(false);
    }
  }, [student]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (editableStudent) {
      onUpdate(editableStudent);
      setIsEditing(false);
    }
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditableStudent(structuredClone(student));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editableStudent) return;
    
    const { name, value } = e.target;
    setEditableStudent(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleSelectChange = (field: string, value: string) => {
    if (!editableStudent) return;
    
    setEditableStudent(prev => prev ? { ...prev, [field]: value } : null);
  };
  
  const handleGradeChange = (value: string) => {
    if (!editableStudent) return;
    
    setEditableStudent(prev => prev ? { 
      ...prev, 
      grade: parseInt(value, 10) 
    } : null);
  };
  
  const handleNumberInputChange = (field: string, value: number) => {
    if (!editableStudent) return;
    
    setEditableStudent(prev => prev ? {
      ...prev,
      [field]: value
    } : null);
  };

  return {
    isEditing,
    editableStudent,
    handleEdit,
    handleSave,
    handleCancel,
    handleInputChange,
    handleSelectChange,
    handleGradeChange,
    handleNumberInputChange
  };
};
