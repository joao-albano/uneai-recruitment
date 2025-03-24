
import { useCallback } from 'react';
import { UserType } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUserEdit = (fetchUsers: () => Promise<void>) => {
  const { toast } = useToast();
  
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

      // Obter dados do formulário
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const role = formData.get('role') as string;
      const isAdmin = role === 'admin';
      const isSuperAdmin = selectedUser.isSuperAdmin;
      
      // Usar a função RPC para atualizar o usuário
      const { error } = await supabase.rpc('update_user_profile', {
        user_id: selectedUser.id.toString(),
        name,
        email,
        role,
        is_admin: isAdmin,
        is_super_admin: isSuperAdmin
      });
      
      if (error) {
        console.error("Erro ao atualizar usuário:", error);
        toast({
          title: "Erro ao atualizar",
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
  }, [fetchUsers, toast]);

  return {
    handleEditUser
  };
};
