
import { useCallback } from 'react';
import { OrganizationType } from '../types';
import { toast } from "sonner";

export const useOrganizationDialogs = (
  setSelectedOrganization: React.Dispatch<React.SetStateAction<OrganizationType | null>>,
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleOpenEditDialog = useCallback((organization: OrganizationType) => {
    try {
      // Create a deep copy to avoid reference issues
      const orgCopy = JSON.parse(JSON.stringify(organization)) as OrganizationType;
      setSelectedOrganization(orgCopy);
      setShowEditDialog(true);
    } catch (error) {
      console.error("Erro ao abrir diálogo de edição:", error);
      toast.error("Erro ao abrir diálogo de edição");
    }
  }, [setSelectedOrganization, setShowEditDialog]);

  const handleOpenDeleteDialog = useCallback((organization: OrganizationType) => {
    try {
      // Create a deep copy to avoid reference issues
      const orgCopy = JSON.parse(JSON.stringify(organization)) as OrganizationType;
      setSelectedOrganization(orgCopy);
      setShowDeleteDialog(true);
    } catch (error) {
      console.error("Erro ao abrir diálogo de exclusão:", error);
      toast.error("Erro ao abrir diálogo de exclusão");
    }
  }, [setSelectedOrganization, setShowDeleteDialog]);

  return {
    handleOpenEditDialog,
    handleOpenDeleteDialog
  };
};
