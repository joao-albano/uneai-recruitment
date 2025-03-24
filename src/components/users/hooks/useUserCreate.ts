
import { useCallback } from 'react';
import { NewUserType } from '../types';
import { createUser } from '../api/userManagementApi';
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
      
      // Chamar a função de API para criar o usuário
      await createUser({
        email,
        password,
        name,
        role: role || 'user',
        organizationId: newUser.organizationId,
        isSuperAdmin: false,
        initials: ''
      });
      
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
