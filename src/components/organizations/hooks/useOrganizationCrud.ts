
import { useCallback } from 'react';
import { OrganizationType, NewOrganizationType } from '../types';
import { toast } from "sonner";

export const useOrganizationCrud = (
  organizations: OrganizationType[],
  setOrganizations: React.Dispatch<React.SetStateAction<OrganizationType[]>>,
  newOrganization: NewOrganizationType,
  selectedOrganization: OrganizationType | null,
  setSelectedOrganization: React.Dispatch<React.SetStateAction<OrganizationType | null>>,
  setShowCreateDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  resetNewOrganization: () => void
) => {
  const handleCreateOrganization = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newOrganization.name.trim()) {
      toast.error("Nome da organização é obrigatório");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Aqui chamaríamos a API para criar a organização
      const newOrgId = Math.random().toString(36).substring(7);
      const newOrg: OrganizationType = {
        id: newOrgId,
        name: newOrganization.name,
        isActive: newOrganization.isActive,
        isMainOrg: newOrganization.isMainOrg || false,
        createdAt: new Date().toISOString(),
        products: newOrganization.products || [
          { type: 'retention', active: true },
          { type: 'billing', active: false },
          { type: 'recruitment', active: false }
        ]
      };
      
      // Importante: Fechar o diálogo primeiro
      resetNewOrganization();
      setShowCreateDialog(false);
      
      // Simula atraso da API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Finaliza o carregamento
      setIsLoading(false);
      
      // Atualiza os dados após fechamento da UI
      setOrganizations(prev => [...prev, newOrg]);
      
      // Mostra notificação de sucesso
      toast.success("Organização criada com sucesso");
    } catch (error) {
      console.error("Erro ao criar organização:", error);
      toast.error("Erro ao criar organização");
      setIsLoading(false);
    }
  }, [newOrganization, resetNewOrganization, setOrganizations, setShowCreateDialog, setIsLoading]);

  const handleEditOrganization = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOrganization) {
      toast.error("Nenhuma organização selecionada");
      return;
    }
    
    if (!selectedOrganization.name.trim()) {
      toast.error("Nome da organização é obrigatório");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Cria uma cópia profunda da organização selecionada
      const updatedOrg = JSON.parse(JSON.stringify(selectedOrganization));
      
      // Primeiro fecha a UI
      setShowEditDialog(false);
      setSelectedOrganization(null);
      
      // Simula atraso da API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Finaliza o carregamento
      setIsLoading(false);
      
      // Depois atualiza os dados
      setOrganizations(organizations.map(org => 
        org.id === updatedOrg.id ? updatedOrg : org
      ));
      
      // Notificação de sucesso
      toast.success("Organização atualizada com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar organização:", error);
      toast.error("Erro ao atualizar organização");
      setIsLoading(false);
    }
  }, [organizations, selectedOrganization, setOrganizations, setSelectedOrganization, setShowEditDialog, setIsLoading]);

  const handleDeleteOrganization = useCallback(async () => {
    if (!selectedOrganization) {
      toast.error("Nenhuma organização selecionada");
      return;
    }
    
    // Não permitir excluir a organização principal do UNE CX
    if (selectedOrganization.isMainOrg) {
      toast.error("Não é possível excluir a organização principal (UNE CX)");
      setShowDeleteDialog(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Primeiro fecha a UI
      setShowDeleteDialog(false);
      const orgId = selectedOrganization.id;
      setSelectedOrganization(null);
      
      // Simula atraso da API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Finaliza o carregamento
      setIsLoading(false);
      
      // Depois atualiza os dados
      setOrganizations(organizations.filter(org => org.id !== orgId));
      
      // Notificação de sucesso
      toast.success("Organização excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir organização:", error);
      toast.error("Erro ao excluir organização");
      setIsLoading(false);
    }
  }, [organizations, selectedOrganization, setOrganizations, setSelectedOrganization, setShowDeleteDialog, setIsLoading]);

  return {
    handleCreateOrganization,
    handleEditOrganization,
    handleDeleteOrganization
  };
};
