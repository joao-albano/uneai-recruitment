
import React, { useState, useEffect } from 'react';
import { useOrganizationData } from './hooks/useOrganizationData';
import { useOrganizationCrud } from './hooks/useOrganizationCrud';
import { useOrganizationDialogs } from './hooks/useOrganizationDialogs';
import CreateOrganizationDialog from './CreateOrganizationDialog';
import EditOrganizationDialog from './EditOrganizationDialog';
import DeleteOrganizationDialog from './DeleteOrganizationDialog';
import OrganizationsList from './OrganizationsList';
import OrganizationsHeader from './OrganizationsHeader';
import { OrganizationType } from './types';

const OrganizationsContent: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Get organization data and functions from hooks
  const { organizations, loadOrganizations } = useOrganizationData();
  
  // Dialogs state
  const { 
    showCreateDialog, setShowCreateDialog,
    showEditDialog, setShowEditDialog,
    showDeleteDialog, setShowDeleteDialog,
    selectedOrg, setSelectedOrg
  } = useOrganizationDialogs();
  
  // CRUD operations
  const {
    handleCreateOrganization,
    handleEditOrganization,
    handleDeleteOrganization
  } = useOrganizationCrud(loadOrganizations);

  useEffect(() => {
    const fetchData = async () => {
      await loadOrganizations();
      setLoading(false);
    };
    fetchData();
  }, [loadOrganizations]);

  // Open dialogs
  const handleOpenCreateDialog = () => {
    setShowCreateDialog(true);
  };

  const handleOpenEditDialog = (organization: OrganizationType) => {
    setSelectedOrg(organization);
    setShowEditDialog(true);
  };

  const handleOpenDeleteDialog = (organization: OrganizationType) => {
    setSelectedOrg(organization);
    setShowDeleteDialog(true);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">
            Carregando organizações...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <OrganizationsHeader 
        orgCount={organizations.length} 
        onCreateOrg={handleOpenCreateDialog} 
      />
      
      <OrganizationsList
        organizations={organizations}
        onEdit={handleOpenEditDialog}
        onDelete={handleOpenDeleteDialog}
      />

      <CreateOrganizationDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreateOrganization}
      />

      <EditOrganizationDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        organization={selectedOrg}
        onSubmit={handleEditOrganization}
      />

      <DeleteOrganizationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        organizationId={selectedOrg?.id}
        onDelete={handleDeleteOrganization}
      />
    </div>
  );
};

export default OrganizationsContent;
