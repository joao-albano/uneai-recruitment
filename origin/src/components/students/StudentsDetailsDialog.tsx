
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Student } from '@/types/data';
import StudentDialogHeader from './dialogs/details/StudentDialogHeader';
import StudentDialogFooter from './dialogs/details/StudentDialogFooter';
import StudentDetailsView from './dialogs/details/StudentDetailsView';
import StudentEditForm from './dialogs/details/StudentEditForm';
import { useStudentEditForm } from './dialogs/details/useStudentEditForm';

interface StudentsDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  onUpdate: (student: Student) => void;
  onDelete: (studentId: string) => void;
}

const StudentsDetailsDialog: React.FC<StudentsDetailsDialogProps> = ({
  open,
  onOpenChange,
  student,
  onUpdate,
  onDelete
}) => {
  const {
    isEditing,
    editableStudent,
    handleEdit,
    handleSave,
    handleCancel,
    handleInputChange,
    handleSelectChange,
    handleGradeChange,
    handleNumberInputChange
  } = useStudentEditForm(student, onUpdate);

  if (!student) return null;

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir o aluno ${student.name}?`)) {
      onDelete(student.id);
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <StudentDialogHeader student={student} />

        {isEditing && editableStudent ? (
          <StudentEditForm
            student={editableStudent}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onGradeChange={handleGradeChange}
            onNumberInputChange={handleNumberInputChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <StudentDetailsView student={student} />
            <StudentDialogFooter onEdit={handleEdit} onDelete={handleDelete} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StudentsDetailsDialog;
