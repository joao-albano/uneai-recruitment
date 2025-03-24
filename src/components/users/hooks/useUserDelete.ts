
import { useCallback } from 'react';
import { UserType } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUserDelete = (fetchUsers: () => Promise<void>) => {
  const { toast } = useToast();
  
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
      
      // Usar a função RPC para excluir o usuário
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
  }, [fetchUsers, toast]);

  return {
    handleDeleteUser
  };
};
