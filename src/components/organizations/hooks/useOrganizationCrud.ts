
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
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // First reset UI state before updating data
      resetNewOrganization();
      setShowCreateDialog(false);
      
      // Then update data and show success message
      setOrganizations(prev => [...prev, newOrg]);
      
      // Small delay before showing toast to ensure UI has updated
      setTimeout(() => {
        toast.success("Organização criada com sucesso");
      }, 100);
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
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a completely new array with the updated organization
      const updatedOrganizations = organizations.map(org => 
        org.id === selectedOrganization.id ? JSON.parse(JSON.stringify(selectedOrganization)) : org
      );
      
      // Important: Close the dialog and reset selected organization BEFORE updating data and showing toast
      const tempSelectedOrg = selectedOrganization; // Save a reference to log if needed
      
      // Clear UI state first
      setSelectedOrganization(null);
      setShowEditDialog(false);
      setIsLoading(false);
      
      // Then update data and show success message with a small delay
      setTimeout(() => {
        setOrganizations(updatedOrganizations);
        toast.success("Organização atualizada com sucesso");
      }, 100);
      
    } catch (error) {
      console.error("Erro ao atualizar organização:", error);
      toast.error("Erro ao atualizar organização");
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
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Prepare the filtered list but don't update state yet
      const filteredOrganizations = organizations.filter(
        org => org.id !== selectedOrganization.id
      );
      
      // Close dialog and reset selection BEFORE updating the list and showing toast
      const tempSelectedOrg = selectedOrganization; // Save a reference to log if needed
      
      // Clear UI state first
      setSelectedOrganization(null);
      setShowDeleteDialog(false);
      setIsLoading(false);
      
      // Then update data and show success with a small delay
      setTimeout(() => {
        setOrganizations(filteredOrganizations);
        toast.success("Organização excluída com sucesso");
      }, 100);
    } catch (error) {
      console.error("Erro ao excluir organização:", error);
      toast.error("Erro ao excluir organização");
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
