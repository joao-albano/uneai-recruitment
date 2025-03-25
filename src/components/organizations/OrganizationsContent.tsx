
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from '@/context/auth';
import { useOrganizations } from './hooks/useOrganizations';
import OrganizationsList from './OrganizationsList';
import OrganizationsHeader from './OrganizationsHeader';
import CreateOrganizationDialog from './CreateOrganizationDialog';
import EditOrganizationDialog from './EditOrganizationDialog';
import DeleteOrganizationDialog from './DeleteOrganizationDialog';
import OrganizationsLoading from './OrganizationsLoading';
import OrganizationsEmpty from './OrganizationsEmpty';

const OrganizationsContent: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin, isSuperAdmin } = useAuth();
  
  const {
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
    setShowCreateDialog,
    setShowEditDialog,
    setShowDeleteDialog,
    // Handlers
    handleOpenEditDialog,
    handleOpenDeleteDialog,
    loadOrganizations
  } = useOrganizations();

  // Create, Edit, Delete handlers
  const handleCreateSubmit = async (values: { name?: string; isActive?: boolean }) => {
    try {
      await handleCreateOrganization(values.name || '', values.isActive || false);
      setShowCreateDialog(false);
      setNewOrganization({
        name: '',
        isActive: true,
        isMainOrg: false,
        products: [
          { type: 'retention', active: true },
          { type: 'billing', active: false }
        ]
      });
    } catch (error) {
      console.error("Error submitting organization:", error);
    }
  };
  
  const handleEditSubmit = async (values: { name?: string; isActive?: boolean }) => {
    if (selectedOrganization) {
      try {
        await handleEditOrganization(
          selectedOrganization.id,
          values.name || '',
          values.isActive || false
        );
        setShowEditDialog(false);
      } catch (error) {
        console.error("Error updating organization:", error);
      }
    }
  };
  
  const handleDeleteSubmit = async () => {
    if (selectedOrganization) {
      try {
        await handleDeleteOrganization(selectedOrganization.id);
        setShowDeleteDialog(false);
      } catch (error) {
        console.error("Error deleting organization:", error);
      }
    }
  };

  // Check permissions and load data on mount
  useEffect(() => {
    // Verify permissions - redirect if not admin or super admin
    if (!isAdmin && !isSuperAdmin) {
      toast.error("Você não tem permissão para acessar esta página");
      navigate('/');
      return;
    }
    
    loadOrganizations();
  }, [isAdmin, isSuperAdmin, navigate, loadOrganizations]);

  // Show error message if no permissions
  if (!isAdmin && !isSuperAdmin) {
    return <OrganizationsEmpty message="Você não tem permissão para acessar esta página." />;
  }

  // Show loading state
  if (isLoading) {
    return <OrganizationsLoading />;
  }

  return (
    <div className="space-y-8 p-8">
      <OrganizationsHeader 
        count={organizations.length} 
        onCreateNew={() => setShowCreateDialog(true)} 
      />
      
      {organizations.length > 0 ? (
        <OrganizationsList
          organizations={organizations}
          onEdit={handleOpenEditDialog}
          onDelete={handleOpenDeleteDialog}
        />
      ) : (
        <OrganizationsEmpty message="Nenhuma organização encontrada. Clique em 'Nova Organização' para adicionar." />
      )}

      <CreateOrganizationDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        newOrganization={newOrganization}
        setNewOrganization={setNewOrganization}
        onSubmit={handleCreateSubmit}
      />

      {selectedOrganization && (
        <>
          <EditOrganizationDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            organization={selectedOrganization}
            onSubmit={handleEditSubmit}
          />

          <DeleteOrganizationDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            organization={selectedOrganization}
            onDelete={handleDeleteSubmit}
          />
        </>
      )}
    </div>
  );
};

export default OrganizationsContent;
