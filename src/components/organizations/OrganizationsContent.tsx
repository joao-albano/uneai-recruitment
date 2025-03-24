
import React, { useState, useEffect } from 'react';
import { useOrganizationData } from './hooks/useOrganizationData';
import { useOrganizationCrud } from './hooks/useOrganizationCrud';
import CreateOrganizationDialog from './CreateOrganizationDialog';
import EditOrganizationDialog from './EditOrganizationDialog';
import DeleteOrganizationDialog from './DeleteOrganizationDialog';
import OrganizationsList from './OrganizationsList';
import OrganizationsHeader from './OrganizationsHeader';
import { OrganizationType } from './types';
import { z } from 'zod';

const OrganizationsContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<OrganizationType | null>(null);
  const [newOrganization, setNewOrganization] = useState({ name: '', isActive: true });

  // Get organization data and functions from hooks
  const { loadOrganizations } = useOrganizationData(setOrganizations, setLoading);
  
  // CRUD operations
  const {
    handleCreateOrganization,
    handleEditOrganization,
    handleDeleteOrganization
  } = useOrganizationCrud(loadOrganizations);

  useEffect(() => {
    loadOrganizations();
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

  // Submit handlers that match expected formats
  const handleCreateSubmit = async (values: { name?: string; isActive?: boolean }) => {
    await handleCreateOrganization(values.name || '', values.isActive || false);
    setShowCreateDialog(false);
    
    // Refresh organizations list
    loadOrganizations();
  };
  
  const handleEditSubmit = async (values: { name?: string; isActive?: boolean }) => {
    if (selectedOrg) {
      await handleEditOrganization(selectedOrg.id, values.name || '', values.isActive || false);
      setShowEditDialog(false);
      
      // Refresh organizations list
      loadOrganizations();
    }
  };
  
  const handleDelete = async () => {
    if (selectedOrg) {
      await handleDeleteOrganization(selectedOrg.id);
      setShowDeleteDialog(false);
      
      // Refresh organizations list
      loadOrganizations();
    }
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
        count={organizations.length} 
        onCreateNew={handleOpenCreateDialog} 
      />
      
      <OrganizationsList
        organizations={organizations}
        onEdit={handleOpenEditDialog}
        onDelete={handleOpenDeleteDialog}
      />

      <CreateOrganizationDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        newOrganization={newOrganization}
        setNewOrganization={setNewOrganization}
        onSubmit={handleCreateSubmit}
      />

      {selectedOrg && (
        <EditOrganizationDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          organization={selectedOrg}
          onSubmit={handleEditSubmit}
        />
      )}

      <DeleteOrganizationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        organization={selectedOrg}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default OrganizationsContent;
