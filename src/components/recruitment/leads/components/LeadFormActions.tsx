
import React from 'react';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';

interface LeadFormActionsProps {
  onCancel: () => void;
}

const LeadFormActions: React.FC<LeadFormActionsProps> = ({ onCancel }) => {
  return (
    <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4 sm:justify-end">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel} 
        className="w-full sm:w-auto gap-2 text-xs md:text-sm"
      >
        <X className="h-3 w-3 md:h-4 md:w-4" />
        Cancelar
      </Button>
      <Button 
        type="submit" 
        className="w-full sm:w-auto gap-2 text-xs md:text-sm"
      >
        <Save className="h-3 w-3 md:h-4 md:w-4" />
        Salvar Lead
      </Button>
    </DialogFooter>
  );
};

export default LeadFormActions;
