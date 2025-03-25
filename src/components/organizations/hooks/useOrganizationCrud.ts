
import { useCallback } from 'react';
import { toast } from "sonner";
import { createOrganization, updateOrganization, deleteOrganization } from '../api';
import { ProductType } from '@/context/ProductContext';

export const useOrganizationCrud = (
  loadOrganizations: () => Promise<void>
) => {
  const handleCreateOrganization = useCallback(async (name: string, isActive: boolean) => {
    if (!name.trim()) {
      toast.error("Nome da organização é obrigatório");
      return;
    }
    
    try {
      // Criar a organização no Supabase
      await createOrganization({
        name: name.trim(),
        isActive,
        products: [
          { type: 'retention' as ProductType, active: true },
          { type: 'billing' as ProductType, active: false },
          { type: 'recruitment' as ProductType, active: false },
          { type: 'secretary' as ProductType, active: false },
          { type: 'pedagogical' as ProductType, active: false }
        ]
      });
      
      // Notificação de sucesso
      toast.success("Organização criada com sucesso");
      
      // Atualizar a lista
      await loadOrganizations();
    } catch (error) {
      console.error("Erro ao criar organização:", error);
      toast.error("Erro ao criar organização");
    }
  }, [loadOrganizations]);

  const handleEditOrganization = useCallback(async (id: string, name: string, isActive: boolean) => {
    if (!name.trim()) {
      toast.error("Nome da organização é obrigatório");
      return;
    }
    
    try {
      // Atualizar a organização no Supabase
      await updateOrganization(id, {
        name: name.trim(),
        isActive
      });
      
      // Notificação de sucesso
      toast.success("Organização atualizada com sucesso");
      
      // Atualizar a lista
      await loadOrganizations();
    } catch (error) {
      console.error("Erro ao atualizar organização:", error);
      toast.error("Erro ao atualizar organização");
    }
  }, [loadOrganizations]);

  const handleDeleteOrganization = useCallback(async (id: string) => {
    try {
      // Excluir a organização no Supabase
      await deleteOrganization(id);
      
      // Notificação de sucesso
      toast.success("Organização excluída com sucesso");
      
      // Atualizar a lista
      await loadOrganizations();
    } catch (error) {
      console.error("Erro ao excluir organização:", error);
      toast.error("Erro ao excluir organização");
    }
  }, [loadOrganizations]);

  return {
    handleCreateOrganization,
    handleEditOrganization,
    handleDeleteOrganization
  };
};
