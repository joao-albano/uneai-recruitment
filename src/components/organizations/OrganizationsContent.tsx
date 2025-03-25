
import React, { useEffect, useState } from 'react';
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
  const { isAdmin, isSuperAdmin, currentUser } = useAuth();
  const [retryCount, setRetryCount] = useState(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  
  const {
    // State
    organizations,
    selectedOrganization,
    showCreateDialog,
    showEditDialog,
    showDeleteDialog,
    isLoading,
    // State setters
    setShowCreateDialog,
    setShowEditDialog,
    setShowDeleteDialog,
    // Handlers
    handleOpenEditDialog,
    handleOpenDeleteDialog,
    // Data loading
    loadOrganizations,
  } = useOrganizations();

  // Check permissions and load data on mount
  useEffect(() => {
    console.log('OrganizationsContent iniciado, verificando permissões:', { isAdmin, isSuperAdmin, currentUser });
    
    // Verify permissions - redirect if not admin or super admin
    if (!isAdmin && !isSuperAdmin) {
      toast.error("Você não tem permissão para acessar esta página");
      navigate('/');
      return;
    }
    
    const loadData = async () => {
      await loadOrganizations();
      setInitialLoadComplete(true);
    };
    
    loadData();
    
  }, [isAdmin, isSuperAdmin, navigate, loadOrganizations, currentUser]);

  // Retry loading if needed
  useEffect(() => {
    if (initialLoadComplete && organizations.length === 0 && retryCount < 3) {
      const timer = setTimeout(() => {
        console.log(`Tentativa ${retryCount + 1} de carregar organizações...`);
        loadOrganizations();
        setRetryCount(prev => prev + 1);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [initialLoadComplete, organizations.length, retryCount, loadOrganizations]);

  // Show error message if no permissions
  if (!isAdmin && !isSuperAdmin) {
    return <OrganizationsEmpty message="Você não tem permissão para acessar esta página." />;
  }

  // Show loading state
  if (isLoading && !initialLoadComplete) {
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
      />

      {selectedOrganization && (
        <>
          <EditOrganizationDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            organization={selectedOrganization}
            onSubmit={() => {
              setShowEditDialog(false);
              loadOrganizations();
            }}
          />

          <DeleteOrganizationDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            organization={selectedOrganization}
            onDelete={async () => {
              setShowDeleteDialog(false);
              await loadOrganizations();
            }}
          />
        </>
      )}
    </div>
  );
};

export default OrganizationsContent;
