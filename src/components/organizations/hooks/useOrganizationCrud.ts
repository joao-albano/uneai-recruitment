
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
      
      // Here we would call API to create organization
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
      
      // Simular um atraso de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setOrganizations(prev => [...prev, newOrg]);
      resetNewOrganization();
      
      toast.success("Organização criada com sucesso");
      setShowCreateDialog(false);
    } catch (error) {
      console.error("Erro ao criar organização:", error);
      toast.error("Erro ao criar organização");
    } finally {
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
      
      // Simular um atraso de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Here we would call API to update organization
      const updatedOrganizations = organizations.map(org => 
        org.id === selectedOrganization.id ? {...selectedOrganization} : org
      );
      
      setOrganizations(updatedOrganizations);
      
      // Important: Close the dialog and reset selected organization BEFORE toast
      setSelectedOrganization(null);
      setShowEditDialog(false);
      
      toast.success("Organização atualizada com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar organização:", error);
      toast.error("Erro ao atualizar organização");
    } finally {
      // Make sure loading state is reset even if there's an error
      setIsLoading(false);
    }
  }, [organizations, selectedOrganization, setOrganizations, setSelectedOrganization, setShowEditDialog, setIsLoading]);

  const handleDeleteOrganization = useCallback(async () => {
    if (!selectedOrganization) {
      toast.error("Nenhuma organização selecionada");
      return;
    }
    
    // Do not allow deleting the main UNE CX organization
    if (selectedOrganization.isMainOrg) {
      toast.error("Não é possível excluir a organização principal (UNE CX)");
      setShowDeleteDialog(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Simular um atraso de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Here we would call API to delete organization
      const filteredOrganizations = organizations.filter(
        org => org.id !== selectedOrganization.id
      );
      
      // Close dialog and reset selection BEFORE updating the list and showing toast
      setSelectedOrganization(null);
      setShowDeleteDialog(false);
      
      setOrganizations(filteredOrganizations);
      toast.success("Organização excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir organização:", error);
      toast.error("Erro ao excluir organização");
    } finally {
      // Make sure loading state is reset even if there's an error
      setIsLoading(false);
    }
  }, [organizations, selectedOrganization, setOrganizations, setSelectedOrganization, setShowDeleteDialog, setIsLoading]);

  return {
    handleCreateOrganization,
    handleEditOrganization,
    handleDeleteOrganization
  };
};
