
import { useCallback } from 'react';
import { UserType } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth';

export const useUserDelete = (fetchUsers: () => Promise<void>) => {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  
  // Excluir usuário
  const handleDeleteUser = useCallback(async (selectedUser: UserType | null, onSuccess: () => void) => {
    try {
      if (!selectedUser) {
        toast({
          title: "Erro",
          description: "Nenhum usuário selecionado para exclusão.",
          variant: "destructive"
        });
        return;
      }
      
      // Verificar se o usuário está tentando excluir a própria conta
      if (currentUser && selectedUser.id === Number(currentUser.id)) {
        toast({
          title: "Operação não permitida",
          description: "Não é possível excluir sua própria conta.",
          variant: "destructive"
        });
        return;
      }
      
      // Verificar se o usuário é o último admin de uma organização
      if (selectedUser.role === 'admin') {
        const { data: admins, error: adminsError } = await supabase
          .from('profiles')
          .select('id')
          .eq('organization_id', selectedUser.organizationId)
          .eq('is_admin', true);
        
        if (!adminsError && admins && admins.length <= 1) {
          toast({
            title: "Operação não permitida",
            description: "Não é possível excluir o último administrador da organização.",
            variant: "destructive"
          });
          return;
        }
      }
      
      // Excluir o usuário usando a RPC function
      const { error } = await supabase.rpc('delete_user', {
        user_id: selectedUser.id.toString()
      });
      
      if (error) {
        console.error("Erro ao excluir usuário:", error);
        toast({
          title: "Erro ao excluir",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      // Recarregar a lista de usuários
      await fetchUsers();
      
      // Executar callback de sucesso
      onSuccess();
      
      toast({
        title: "Usuário removido",
        description: `${selectedUser.name} foi removido com sucesso.`
      });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      toast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro ao remover o usuário.",
        variant: "destructive"
      });
    }
  }, [fetchUsers, toast, currentUser]);

  return {
    handleDeleteUser
  };
};
