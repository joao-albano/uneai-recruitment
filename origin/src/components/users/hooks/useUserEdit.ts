
import { useCallback } from 'react';
import { UserType, UserRole } from '../types';
import { updateUser } from '../api/userManagementApi';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth';

export const useUserEdit = (fetchUsers: () => Promise<void>) => {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  
  // Editar usuário
  const handleEditUser = useCallback(async (e: React.FormEvent, selectedUser: UserType | null, onSuccess: () => void) => {
    e.preventDefault();
    
    try {
      if (!selectedUser) {
        toast({
          title: "Erro",
          description: "Nenhum usuário selecionado para edição.",
          variant: "destructive"
        });
        return;
      }

      // Verificar se o usuário está tentando editar a própria conta
      if (currentUser && selectedUser.id === currentUser.id) {
        toast({
          title: "Operação não permitida",
          description: "Não é possível editar sua própria conta. Utilize a página de perfil para isso.",
          variant: "destructive"
        });
        return;
      }

      // Obter dados do formulário
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const role = formData.get('role') as UserRole;
      
      // Chamar a função de API para atualizar o usuário
      await updateUser(selectedUser.id.toString(), {
        ...selectedUser,
        name,
        email,
        role,
        isSuperAdmin: selectedUser.isSuperAdmin
      });
      
      // Recarregar a lista de usuários
      await fetchUsers();
      
      // Executar callback de sucesso
      onSuccess();
      
      toast({
        title: "Usuário atualizado",
        description: `As informações de ${name} foram atualizadas.`
      });
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      toast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive"
      });
    }
  }, [fetchUsers, toast, currentUser]);

  return {
    handleEditUser
  };
};
