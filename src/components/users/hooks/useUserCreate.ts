
import { useCallback } from 'react';
import { NewUserType } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUserCreate = (fetchUsers: () => Promise<void>) => {
  const { toast } = useToast();
  
  // Criar usuário
  const handleCreateUser = useCallback(async (e: React.FormEvent, newUser: NewUserType, onSuccess: () => void) => {
    e.preventDefault();
    
    try {
      if (!e.currentTarget) return;
      
      // Get form data
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const role = formData.get('role') as string;
      
      if (!name || !email || !password) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive"
        });
        return;
      }
      
      // Usar o API diretamente para criar usuário e perfil
      // Primeiro criar o usuário
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: name }
      });
      
      if (authError) {
        console.error("Erro ao criar usuário:", authError);
        toast({
          title: "Erro ao criar usuário",
          description: authError.message,
          variant: "destructive"
        });
        return;
      }
      
      if (!authData.user) {
        toast({
          title: "Erro ao criar usuário",
          description: "Não foi possível criar o usuário.",
          variant: "destructive"
        });
        return;
      }
      
      // Agora, atualizar o perfil do usuário
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          role: role || 'user',
          is_admin: role === 'admin',
          organization_id: newUser.organizationId
        })
        .eq('id', authData.user.id);
      
      if (profileError) {
        console.error("Erro ao atualizar perfil:", profileError);
        toast({
          title: "Perfil criado parcialmente",
          description: "Usuário criado, mas houve um erro ao configurar o perfil.",
          variant: "destructive"
        });
        // Continuar mesmo com erro para que o usuário seja mostrado
      }
      
      // Recarregar a lista de usuários
      await fetchUsers();
      
      // Executar callback de sucesso (limpar form, fechar modal, etc)
      onSuccess();
      
      toast({
        title: "Usuário criado",
        description: `${name} foi adicionado com sucesso.`
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      toast({
        title: "Erro ao criar usuário",
        description: "Ocorreu um erro ao processar a solicitação.",
        variant: "destructive"
      });
    }
  }, [fetchUsers, toast]);

  return {
    handleCreateUser
  };
};
