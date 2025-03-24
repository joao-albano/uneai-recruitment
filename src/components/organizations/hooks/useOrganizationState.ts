
import { useState } from 'react';
import { OrganizationType, NewOrganizationType } from '../types';
import { ProductType } from '@/context/ProductContext';

export const useOrganizationState = () => {
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [newOrganization, setNewOrganization] = useState<NewOrganizationType>({
    name: '',
    isActive: true,
    isMainOrg: false,
    products: [
      { type: 'retention' as ProductType, active: true },
      { type: 'billing' as ProductType, active: false },
      { type: 'recruitment' as ProductType, active: false },
      { type: 'secretary' as ProductType, active: false },
      { type: 'pedagogical' as ProductType, active: false }
    ]
  });
  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationType | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetNewOrganization = () => {
    setNewOrganization({
      name: '',
      isActive: true,
      isMainOrg: false,
      products: [
        { type: 'retention' as ProductType, active: true },
        { type: 'billing' as ProductType, active: false },
        { type: 'recruitment' as ProductType, active: false },
        { type: 'secretary' as ProductType, active: false },
        { type: 'pedagogical' as ProductType, active: false }
      ]
    });
  };

  return {
    organizations,
    setOrganizations,
    newOrganization,
    setNewOrganization,
    selectedOrganization,
    setSelectedOrganization,
    showCreateDialog,
    setShowCreateDialog,
    showEditDialog,
    setShowEditDialog,
    showDeleteDialog,
    setShowDeleteDialog,
    isLoading,
    setIsLoading,
    resetNewOrganization
  };
};
