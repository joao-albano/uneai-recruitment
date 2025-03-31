
import React from 'react';
import { Button } from '@/components/ui/button';
import { Student } from '@/types/data';
import StudentDialogForm from '../form/StudentDialogForm';

interface StudentEditFormProps {
  student: Student;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (field: string, value: string) => void;
  onGradeChange: (value: string) => void;
  onNumberInputChange: (field: string, value: number) => void;
  onSave: () => void;
  onCancel: () => void;
}

const StudentEditForm: React.FC<StudentEditFormProps> = ({
  student,
  onInputChange,
  onSelectChange,
  onGradeChange,
  onNumberInputChange,
  onSave,
  onCancel
}) => {
  return (
    <div className="py-4">
      <StudentDialogForm 
        student={student}
        onInputChange={onInputChange}
        onSelectChange={onSelectChange}
        onGradeChange={onGradeChange}
        onNumberInputChange={onNumberInputChange}
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button onClick={onSave}>Salvar</Button>
      </div>
    </div>
  );
};

export default StudentEditForm;
