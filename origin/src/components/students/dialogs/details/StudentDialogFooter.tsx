
import React from 'react';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface StudentDialogFooterProps {
  onEdit: () => void;
  onDelete: () => void;
}

const StudentDialogFooter: React.FC<StudentDialogFooterProps> = ({ onEdit, onDelete }) => {
  return (
    <DialogFooter className="flex justify-between items-center">
      <Button 
        variant="destructive" 
        size="sm" 
        className="flex items-center gap-1"
        onClick={onDelete}
      >
        <Trash2 size={16} />
        Excluir
      </Button>
      <Button 
        size="sm" 
        className="flex items-center gap-1"
        onClick={onEdit}
      >
        <Pencil size={16} />
        Editar
      </Button>
    </DialogFooter>
  );
};

export default StudentDialogFooter;
