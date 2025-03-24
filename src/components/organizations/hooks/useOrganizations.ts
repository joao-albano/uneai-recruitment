
import { useState, useEffect, useCallback } from 'react';
import { OrganizationType, NewOrganizationType } from '../types';
import { ProductType } from '@/context/ProductContext';
import { toast } from "sonner";

export const useOrganizations = () => {
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [newOrganization, setNewOrganization] = useState<NewOrganizationType>({
    name: '',
    isActive: true,
    isMainOrg: false,
    products: [
      { type: 'retention' as ProductType, active: true },
      { type: 'billing' as ProductType, active: false },
      { type: 'recruitment' as ProductType, active: false }
    ]
  });
  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationType | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch organizations on component mount
  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = useCallback(() => {
    try {
      setIsLoading(true);
      // Here we would fetch organizations from API
      // For now, using mock data
      const mockOrganizations: OrganizationType[] = [
        {
          id: '0',
          name: 'UNE CX',
          isActive: true,
          isMainOrg: true,
          createdAt: '2023-01-01',
          products: [
            { type: 'retention' as ProductType, active: true },
            { type: 'billing' as ProductType, active: true },
            { type: 'recruitment' as ProductType, active: true }
          ]
        },
        {
          id: '1',
          name: 'Escola de Letras',
          isActive: true,
          isMainOrg: false,
          createdAt: '2023-02-15',
          products: [
            { type: 'retention' as ProductType, active: true },
            { type: 'billing' as ProductType, active: true },
            { type: 'recruitment' as ProductType, active: false }
          ]
        },
        {
          id: '2',
          name: 'Outra Escola',
          isActive: true,
          isMainOrg: false,
          createdAt: '2023-03-20',
          products: [
            { type: 'retention' as ProductType, active: true },
            { type: 'billing' as ProductType, active: false },
            { type: 'recruitment' as ProductType, active: false }
          ]
        }
      ];
      
      setOrganizations(mockOrganizations);
    } catch (error) {
      console.error("Erro ao carregar organizações:", error);
      toast.error("Erro ao carregar organizações");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetNewOrganization = useCallback(() => {
    setNewOrganization({
      name: '',
      isActive: true,
      isMainOrg: false,
      products: [
        { type: 'retention' as ProductType, active: true },
        { type: 'billing' as ProductType, active: false },
        { type: 'recruitment' as ProductType, active: false }
      ]
    });
  }, []);

  const handleOpenEditDialog = useCallback((organization: OrganizationType) => {
    try {
      // Usar uma cópia profunda para evitar problemas de referência
      const orgCopy = structuredClone(organization);
      setSelectedOrganization(orgCopy);
      setShowEditDialog(true);
    } catch (error) {
      console.error("Erro ao abrir diálogo de edição:", error);
      toast.error("Erro ao abrir diálogo de edição");
    }
  }, []);

  const handleOpenDeleteDialog = useCallback((organization: OrganizationType) => {
    try {
      // Usar uma cópia profunda para evitar problemas de referência
      const orgCopy = structuredClone(organization);
      setSelectedOrganization(orgCopy);
      setShowDeleteDialog(true);
    } catch (error) {
      console.error("Erro ao abrir diálogo de exclusão:", error);
      toast.error("Erro ao abrir diálogo de exclusão");
    }
  }, []);

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
          { type: 'retention' as ProductType, active: true },
          { type: 'billing' as ProductType, active: false },
          { type: 'recruitment' as ProductType, active: false }
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
  }, [newOrganization, resetNewOrganization]);

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
        org.id === selectedOrganization.id ? selectedOrganization : org
      );
      
      setOrganizations(updatedOrganizations);
      toast.success("Organização atualizada com sucesso");
      
      // Resetar o estado após a atualização
      setSelectedOrganization(null);
      setShowEditDialog(false);
    } catch (error) {
      console.error("Erro ao atualizar organização:", error);
      toast.error("Erro ao atualizar organização");
    } finally {
      setIsLoading(false);
    }
  }, [organizations, selectedOrganization]);

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
      
      setOrganizations(filteredOrganizations);
      toast.success("Organização excluída com sucesso");
      
      // Resetar o estado após a exclusão
      setSelectedOrganization(null);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Erro ao excluir organização:", error);
      toast.error("Erro ao excluir organização");
    } finally {
      setIsLoading(false);
    }
  }, [organizations, selectedOrganization]);

  return {
    organizations,
    newOrganization,
    selectedOrganization,
    showCreateDialog,
    showEditDialog,
    showDeleteDialog,
    isLoading,
    setNewOrganization,
    setSelectedOrganization,
    setShowCreateDialog,
    setShowEditDialog,
    setShowDeleteDialog,
    handleOpenEditDialog,
    handleOpenDeleteDialog,
    handleCreateOrganization,
    handleEditOrganization,
    handleDeleteOrganization
  };
};
