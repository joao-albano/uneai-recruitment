
import React from 'react';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface LeadFormActionsProps {
  onCancel: () => void;
}

const LeadFormActions: React.FC<LeadFormActionsProps> = ({ onCancel }) => {
  return (
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
      <Button type="submit">Salvar Lead</Button>
    </DialogFooter>
  );
};

export default LeadFormActions;
