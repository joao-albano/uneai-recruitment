
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import DialingRuleForm from '../DialingRuleForm';
import { DialingRule, RedialInterval } from '@/types/voicecall';
import { useIsMobile } from '@/hooks/use-mobile';

interface EditRuleDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rule: Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'>) => void;
  rule: DialingRule | null;
  defaultRedialIntervals: RedialInterval[];
  isSubmitting: boolean;
}

const EditRuleDialog: React.FC<EditRuleDialogProps> = ({
  open,
  onClose,
  onSubmit,
  rule,
  defaultRedialIntervals,
  isSubmitting
}) => {
  const isMobile = useIsMobile();

  if (!rule) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'w-[95%] max-h-[90vh] overflow-y-auto' : 'max-w-3xl max-h-[90vh] overflow-y-auto'}`}>
        <DialogHeader>
          <DialogTitle>Editar Regra de Discagem</DialogTitle>
          <DialogDescription>
            Atualize os parâmetros da regra de discagem.
          </DialogDescription>
        </DialogHeader>
        <DialingRuleForm 
          initialData={rule}
          onSubmit={onSubmit} 
          onCancel={onClose}
          defaultRedialIntervals={defaultRedialIntervals}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditRuleDialog;
