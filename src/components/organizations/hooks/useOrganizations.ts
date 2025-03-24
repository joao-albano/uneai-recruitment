
import { useState, useEffect } from 'react';
import { OrganizationType, NewOrganizationType } from '../types';

export const useOrganizations = () => {
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [newOrganization, setNewOrganization] = useState<NewOrganizationType>({
    name: '',
    isActive: true,
    isMainOrg: false,
    products: [
      { type: 'retention', active: true },
      { type: 'billing', active: false },
      { type: 'recruitment', active: false }
    ]
  });
  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationType | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Fetch organizations on component mount
  useEffect(() => {
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
          { type: 'retention', active: true },
          { type: 'billing', active: true },
          { type: 'recruitment', active: true }
        ]
      },
      {
        id: '1',
        name: 'Escola de Letras',
        isActive: true,
        isMainOrg: false,
        createdAt: '2023-02-15',
        products: [
          { type: 'retention', active: true },
          { type: 'billing', active: true },
          { type: 'recruitment', active: false }
        ]
      },
      {
        id: '2',
        name: 'Outra Escola',
        isActive: true,
        isMainOrg: false,
        createdAt: '2023-03-20',
        products: [
          { type: 'retention', active: true },
          { type: 'billing', active: false },
          { type: 'recruitment', active: false }
        ]
      }
    ];
    
    setOrganizations(mockOrganizations);
  }, []);

  const handleOpenEditDialog = (organization: OrganizationType) => {
    // Usar uma cópia profunda para evitar problemas de referência
    const orgCopy = structuredClone(organization);
    setSelectedOrganization(orgCopy);
    setShowEditDialog(true);
  };

  const handleOpenDeleteDialog = (organization: OrganizationType) => {
    // Usar uma cópia profunda para evitar problemas de referência
    const orgCopy = structuredClone(organization);
    setSelectedOrganization(orgCopy);
    setShowDeleteDialog(true);
  };

  const handleCreateOrganization = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would call API to create organization
    const newOrgId = Math.random().toString(36).substring(7);
    const newOrg: OrganizationType = {
      id: newOrgId,
      name: newOrganization.name,
      isActive: newOrganization.isActive,
      isMainOrg: newOrganization.isMainOrg,
      createdAt: new Date().toISOString(),
      products: newOrganization.products || [
        { type: 'retention', active: true },
        { type: 'billing', active: false },
        { type: 'recruitment', active: false }
      ]
    };
    
    setOrganizations([...organizations, newOrg]);
    setNewOrganization({
      name: '',
      isActive: true,
      isMainOrg: false,
      products: [
        { type: 'retention', active: true },
        { type: 'billing', active: false },
        { type: 'recruitment', active: false }
      ]
    });
    setShowCreateDialog(false);
  };

  const handleEditOrganization = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOrganization) return;
    
    // Here we would call API to update organization
    const updatedOrganizations = organizations.map(org => 
      org.id === selectedOrganization.id ? selectedOrganization : org
    );
    
    setOrganizations(updatedOrganizations);
    setSelectedOrganization(null);
    setShowEditDialog(false);
  };

  const handleDeleteOrganization = () => {
    if (!selectedOrganization) return;
    
    // Do not allow deleting the main UNE CX organization
    if (selectedOrganization.isMainOrg) {
      alert('Não é possível excluir a organização principal (UNE CX)');
      setShowDeleteDialog(false);
      return;
    }
    
    // Here we would call API to delete organization
    const filteredOrganizations = organizations.filter(
      org => org.id !== selectedOrganization.id
    );
    
    setOrganizations(filteredOrganizations);
    setSelectedOrganization(null);
    setShowDeleteDialog(false);
  };

  return {
    organizations,
    newOrganization,
    selectedOrganization,
    showCreateDialog,
    showEditDialog,
    showDeleteDialog,
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
