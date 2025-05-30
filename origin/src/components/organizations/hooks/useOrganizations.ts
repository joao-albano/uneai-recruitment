
import { useCallback } from 'react';
import { useOrganizationState } from './useOrganizationState';
import { useOrganizationData } from './useOrganizationData';
import { useOrganizationDialogs } from './useOrganizationDialogs';
import { OrganizationType } from '../types';

export const useOrganizations = () => {
  // Get state management functionality
  const {
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
  } = useOrganizationState();

  // Get data loading functionality
  const { loadOrganizations } = useOrganizationData(setOrganizations, setIsLoading);

  // Get dialog handling functionality
  const {
    handleOpenEditDialog,
    handleOpenDeleteDialog
  } = useOrganizationDialogs(
    setSelectedOrganization,
    setShowEditDialog,
    setShowDeleteDialog
  );

  // Return everything needed by components
  return {
    // State
    organizations,
    newOrganization,
    selectedOrganization,
    showCreateDialog,
    showEditDialog,
    showDeleteDialog,
    isLoading,
    // State setters
    setNewOrganization,
    setSelectedOrganization,
    setShowCreateDialog,
    setShowEditDialog,
    setShowDeleteDialog,
    // Handlers
    handleOpenEditDialog,
    handleOpenDeleteDialog,
    // Data loading
    loadOrganizations,
    // Utilities
    resetNewOrganization
  };
};
