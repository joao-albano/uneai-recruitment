
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import DialingRuleForm from '../DialingRuleForm';
import { DialingRule, RedialInterval } from '@/types/voicecall';
import { useIsMobile } from '@/hooks/use-mobile';

interface AddRuleDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rule: Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'>) => void;
  defaultRedialIntervals: RedialInterval[];
  isSubmitting: boolean;
}

const AddRuleDialog: React.FC<AddRuleDialogProps> = ({
  open,
  onClose,
  onSubmit,
  defaultRedialIntervals,
  isSubmitting
}) => {
  const isMobile = useIsMobile();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'w-[95%] max-h-[90vh] overflow-y-auto' : 'max-w-3xl max-h-[90vh] overflow-y-auto'}`}>
        <DialogHeader>
          <DialogTitle>Nova Regra de Discagem</DialogTitle>
          <DialogDescription>
            Configure os parâmetros da nova regra de discagem automática.
          </DialogDescription>
        </DialogHeader>
        <DialingRuleForm 
          onSubmit={onSubmit} 
          onCancel={onClose}
          defaultRedialIntervals={defaultRedialIntervals}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddRuleDialog;
