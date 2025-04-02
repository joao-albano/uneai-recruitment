
import React, { useCallback } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface DeleteLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: any;
  onConfirm: (leadId: number) => void;
}

const DeleteLeadDialog: React.FC<DeleteLeadDialogProps> = ({
  open,
  onOpenChange,
  lead,
  onConfirm,
}) => {
  const { toast } = useToast();
  
  const handleDelete = useCallback(() => {
    if (lead?.id) {
      onConfirm(lead.id);
      toast({
        title: "Lead excluído",
        description: "O lead foi excluído com sucesso."
      });
      onOpenChange(false);
    }
  }, [lead, onConfirm, onOpenChange, toast]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Lead</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja excluir o lead <strong>{lead?.name}</strong>? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLeadDialog;
