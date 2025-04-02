
import React, { useState, useCallback } from 'react';
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
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  
  // Improved delete handler with proper state management
  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!lead?.id || isDeleting) return;
    
    setIsDeleting(true);
    
    try {
      // Call confirm action
      onConfirm(Number(lead.id));
      
      // Show success toast
      toast({
        title: "Lead excluído",
        description: "O lead foi excluído com sucesso."
      });
      
      // Close the dialog after successful deletion
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao excluir lead:", error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o lead. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  }, [lead?.id, isDeleting, onConfirm, onOpenChange, toast]);

  // Handle cancel with proper event prevention
  const handleCancel = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenChange(false);
  }, [onOpenChange]);

  // Handle dialog click to prevent propagation
  const handleDialogClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!lead) return null;

  return (
    <AlertDialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (isDeleting) return;
        onOpenChange(isOpen);
      }}
    >
      <AlertDialogContent 
        className="z-50"
        onClick={handleDialogClick}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Lead</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja excluir o lead <strong>{lead?.name}</strong>? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            type="button"
            onClick={handleCancel}
            disabled={isDeleting}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction 
            type="button"
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90"
            disabled={isDeleting}
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLeadDialog;
