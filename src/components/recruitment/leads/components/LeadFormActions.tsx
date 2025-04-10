
import React from 'react';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';

interface LeadFormActionsProps {
  onCancel: () => void;
}

const LeadFormActions: React.FC<LeadFormActionsProps> = ({ onCancel }) => {
  return (
    <DialogFooter className="gap-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel} 
        className="gap-2"
      >
        <X className="h-4 w-4" />
        Cancelar
      </Button>
      <Button type="submit" className="gap-2">
        <Save className="h-4 w-4" />
        Salvar Lead
      </Button>
    </DialogFooter>
  );
};

export default LeadFormActions;
