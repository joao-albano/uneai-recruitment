
import { useCallback, useState } from 'react';
import { NewUserType } from '../types';
import { createUser } from '../api/userManagementApi';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

export const useUserCreate = (fetchUsers: () => Promise<void>) => {
  const { toast } = useToast();
  const [toastShown, setToastShown] = useState(false);
  
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
      
      // Modo de demonstração: aceitar usuários sem organização definida
      const organizationId = newUser.organizationId || 'org-fictitious';
      
      console.log('Enviando dados para criar usuário:', {
        email,
        name,
        role,
        organizationId
      });
      
      // Simular criação bem-sucedida do usuário
      const mockUserResponse = {
        id: uuidv4(),
        email,
        name,
        role: role || 'user',
        organizationId,
        organizationName: newUser.organizationName || 'Organização Teste',
        initials: name.substring(0, 2).toUpperCase(),
        isSuperAdmin: false
      };
      
      // Simular chamada de API (sem interação real com o banco)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Adicionar à lista local (simulada)
      console.log('Usuário criado com sucesso (modo simulação):', mockUserResponse);
      
      // Recarregar a lista de usuários
      await fetchUsers();
      
      // Executar callback de sucesso (limpar form, fechar modal, etc)
      onSuccess();
      
      // Reset toast state
      setToastShown(false);
      
      toast({
        title: "Usuário criado",
        description: `${name} foi adicionado com sucesso.`
      });
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      toast({
        title: "Erro ao criar usuário",
        description: error.message || "Ocorreu um erro ao processar a solicitação.",
        variant: "destructive"
      });
    }
  }, [fetchUsers, toast, toastShown]);

  return {
    handleCreateUser,
    setToastShown
  };
};
