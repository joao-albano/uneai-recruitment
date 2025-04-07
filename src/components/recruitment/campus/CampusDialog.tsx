
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Campus } from '@/types/recruitment/campus';
import CampusForm from './form/CampusForm';
import { useCampusForm } from './hooks/useCampusForm';

interface CampusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campus?: Campus;
  mode: 'create' | 'edit';
}

const CampusDialog: React.FC<CampusDialogProps> = ({ 
  open, 
  onOpenChange, 
  campus, 
  mode 
}) => {
  const {
    courses,
    handleCoursesChange,
    handleSubmit,
    defaultValues
  } = useCampusForm({
    campus,
    mode,
    onClose: () => onOpenChange(false)
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Cadastrar Nova Unidade' : 'Editar Unidade'}
          </DialogTitle>
        </DialogHeader>

        <CampusForm
          defaultValues={defaultValues}
          courses={courses}
          onCoursesChange={handleCoursesChange}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CampusDialog;
