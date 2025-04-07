
import React from 'react';
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
import { Campus } from '@/types/recruitment/campus';
import { useCampus } from './hooks/useCampus';
import { toast } from '@/hooks/use-toast';

interface DeleteCampusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campus: Campus;
}

const DeleteCampusDialog: React.FC<DeleteCampusDialogProps> = ({
  open,
  onOpenChange,
  campus,
}) => {
  const { deleteCampus } = useCampus();

  const handleDelete = async () => {
    try {
      await deleteCampus(campus.id);
      toast({
        title: "Unidade excluída",
        description: "A unidade foi excluída com sucesso."
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Houve um erro ao excluir a unidade. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Unidade</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja excluir a unidade <strong>{campus.name}</strong>? 
            Esta ação não pode ser desfeita e os dados relacionados também serão removidos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCampusDialog;
