
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Campus } from '@/types/recruitment/campus';
import CampusForm from './form/CampusForm';
import { useCampusForm } from './hooks/useCampusForm';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
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
      <DialogContent 
        className={`${isMobile ? 'w-[95vw] p-4' : 'sm:max-w-[95%] md:max-w-[80%] lg:max-w-[700px]'} 
          max-h-[90vh] overflow-y-auto`}
      >
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
