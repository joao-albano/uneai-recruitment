
import React, { useState, useEffect } from 'react';
import { useOrganizationData } from './hooks/useOrganizationData';
import { useOrganizationCrud } from './hooks/useOrganizationCrud';
import { useAuth } from '@/context/auth';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import CreateOrganizationDialog from './CreateOrganizationDialog';
import EditOrganizationDialog from './EditOrganizationDialog';
import DeleteOrganizationDialog from './DeleteOrganizationDialog';
import OrganizationsList from './OrganizationsList';
import OrganizationsHeader from './OrganizationsHeader';
import { OrganizationType } from './types';

const OrganizationsContent: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<OrganizationType | null>(null);
  const [newOrganization, setNewOrganization] = useState({ name: '', isActive: true });
  const { isAdmin, isSuperAdmin } = useAuth();

  // Get organization data and functions from hooks
  const { loadOrganizations } = useOrganizationData(setOrganizations, setLoading);
  
  // CRUD operations
  const {
    handleCreateOrganization,
    handleEditOrganization,
    handleDeleteOrganization
  } = useOrganizationCrud(loadOrganizations);

  useEffect(() => {
    // Check permissions - redirect if not admin or super admin
    if (!isAdmin && !isSuperAdmin) {
      toast.error("Você não tem permissão para acessar esta página");
      navigate('/');
      return;
    }
    
    // Load organizations
    loadOrganizations();
  }, [loadOrganizations, isAdmin, isSuperAdmin, navigate]);

  // Dialog handlers
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

  // Submit handlers
  const handleCreateSubmit = async (values: { name?: string; isActive?: boolean }) => {
    await handleCreateOrganization(values.name || '', values.isActive || false);
    setShowCreateDialog(false);
    setNewOrganization({ name: '', isActive: true });
  };
  
  const handleEditSubmit = async (values: { name?: string; isActive?: boolean }) => {
    if (selectedOrg) {
      await handleEditOrganization(selectedOrg.id, values.name || '', values.isActive || false);
      setShowEditDialog(false);
    }
  };
  
  const handleDelete = async () => {
    if (selectedOrg) {
      await handleDeleteOrganization(selectedOrg.id);
      setShowDeleteDialog(false);
    }
  };

  // Show error message if no permissions
  if (!isAdmin && !isSuperAdmin) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg text-red-600">
            Você não tem permissão para acessar esta página.
          </p>
        </div>
      </div>
    );
  }

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
