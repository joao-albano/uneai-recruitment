
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Student } from '@/types/data';
import StudentDialogForm from './form/StudentDialogForm';
import { useStudentForm } from './hooks/useStudentForm';

interface CreateStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (student: Student) => void;
}

const CreateStudentDialog: React.FC<CreateStudentDialogProps> = ({
  open,
  onOpenChange,
  onCreate
}) => {
  const {
    newStudent,
    handleInputChange,
    handleSelectChange,
    handleGradeChange,
    handleNumberInputChange,
    handleSubmit
  } = useStudentForm(onCreate);

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Aluno</DialogTitle>
          <DialogDescription>
            Preencha os dados para adicionar um novo aluno ao sistema.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit}>
          <StudentDialogForm 
            student={newStudent}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onGradeChange={handleGradeChange}
            onNumberInputChange={handleNumberInputChange}
          />
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar Aluno</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudentDialog;
