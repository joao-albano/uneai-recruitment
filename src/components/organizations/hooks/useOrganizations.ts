
import { useOrganizationState } from './useOrganizationState';
import { useOrganizationData } from './useOrganizationData';
import { useOrganizationDialogs } from './useOrganizationDialogs';
import { useOrganizationCrud } from './useOrganizationCrud';

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

  // Get CRUD operations
  const {
    handleCreateOrganization,
    handleEditOrganization,
    handleDeleteOrganization
  } = useOrganizationCrud(
    loadOrganizations
  );

  // Return everything needed by components
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
