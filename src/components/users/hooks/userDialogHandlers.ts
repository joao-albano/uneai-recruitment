
import { UserType } from '../types';
import { useToast } from "@/hooks/use-toast";

export const useUserDialogHandlers = (
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>,
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  const handleOpenEditDialog = (user: UserType) => {
    try {
      // Make a deep copy to avoid reference issues
      setSelectedUser(JSON.parse(JSON.stringify(user)));
      setShowEditDialog(true);
    } catch (error) {
      console.error("Erro ao abrir diálogo de edição:", error);
      toast({
        title: "Erro",
        description: "Não foi possível abrir o editor de usuário",
        variant: "destructive"
      });
    }
  };
  
  const handleOpenDeleteDialog = (user: UserType) => {
    try {
      // Make a deep copy to avoid reference issues
      setSelectedUser(JSON.parse(JSON.stringify(user)));
      setShowDeleteDialog(true);
    } catch (error) {
      console.error("Erro ao abrir diálogo de exclusão:", error);
      toast({
        title: "Erro",
        description: "Não foi possível abrir o diálogo de exclusão",
        variant: "destructive"
      });
    }
  };

  return {
    handleOpenEditDialog,
    handleOpenDeleteDialog
  };
};
