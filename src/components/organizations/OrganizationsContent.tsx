
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useOrganizationData } from './hooks/useOrganizationData';
import { useOrganizationDialogs } from './hooks/useOrganizationDialogs';
import { useOrganizationCrud } from './hooks/useOrganizationCrud';
import { useAuth } from '@/context/auth';
import OrganizationsHeader from './OrganizationsHeader';
import OrganizationsList from './OrganizationsList';
import CreateOrganizationDialog from './CreateOrganizationDialog';
import EditOrganizationDialog from './EditOrganizationDialog';
import DeleteOrganizationDialog from './DeleteOrganizationDialog';

const OrganizationsContent: React.FC = () => {
  const { organizationState, updateOrganizationState } = useOrganizationData();
  const { dialogState, updateDialogState } = useOrganizationDialogs();
  const { createOrganization, updateOrganization, deleteOrganization } = useOrganizationCrud();
  const { toast } = useToast();
  const { isAdmin, isSuperAdmin } = useAuth();
  
  // Handler para fechar todos os diálogos
  const closeAllDialogs = () => {
    updateDialogState({
      showCreateDialog: false,
      showEditDialog: false,
      showDeleteDialog: false,
    });
  };

  // Handler para abrir o diálogo de criação
  const handleOpenCreateDialog = () => {
    updateDialogState({ showCreateDialog: true });
  };

  // Handler para abrir o diálogo de edição
  const handleOpenEditDialog = (organizationId: string) => {
    const organization = organizationState.organizations.find(org => org.id === organizationId);
    if (organization) {
      updateOrganizationState({ selectedOrganization: organization });
      updateDialogState({ showEditDialog: true });
    }
  };

  // Handler para abrir o diálogo de exclusão
  const handleOpenDeleteDialog = (organizationId: string) => {
    const organization = organizationState.organizations.find(org => org.id === organizationId);
    if (organization) {
      updateOrganizationState({ selectedOrganization: organization });
      updateDialogState({ showDeleteDialog: true });
    }
  };

  // Handler para criação de organização
  const handleCreateOrganization = (e: React.FormEvent) => {
    e.preventDefault();
    if (organizationState.newOrganization) {
      createOrganization(organizationState.newOrganization);
      toast({
        title: "Organização criada",
        description: "A organização foi criada com sucesso",
      });
      closeAllDialogs();
    }
  };

  // Handler para atualização de organização
  const handleUpdateOrganization = (updatedOrg: any) => {
    if (organizationState.selectedOrganization) {
      updateOrganization({
        ...organizationState.selectedOrganization,
        ...updatedOrg
      });
      toast({
        title: "Organização atualizada",
        description: "As informações da organização foram atualizadas com sucesso",
      });
      closeAllDialogs();
    }
  };

  // Handler para exclusão de organização
  const handleDeleteOrganization = () => {
    if (organizationState.selectedOrganization) {
      deleteOrganization(organizationState.selectedOrganization.id);
      toast({
        title: "Organização removida",
        description: "A organização foi removida permanentemente",
        variant: "destructive",
      });
      closeAllDialogs();
    }
  };

  // Não permitir acesso se não for admin
  if (!isAdmin && !isSuperAdmin) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Acesso Restrito</h3>
            <p className="text-muted-foreground mt-2">
              Você não tem permissão para acessar esta página.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <OrganizationsHeader 
        orgCount={organizationState.organizations.length} 
        onCreateOrg={handleOpenCreateDialog}
      />
      
      <OrganizationsList 
        organizations={organizationState.organizations}
        onEdit={handleOpenEditDialog}
        onDelete={handleOpenDeleteDialog}
        isSuperAdmin={isSuperAdmin}
      />
      
      <CreateOrganizationDialog 
        open={dialogState.showCreateDialog}
        onOpenChange={(open) => updateDialogState({ showCreateDialog: open })}
        newOrganization={organizationState.newOrganization}
        setNewOrganization={(newOrg) => updateOrganizationState({ newOrganization: newOrg })}
        onSubmit={handleCreateOrganization}
      />
      
      <EditOrganizationDialog 
        open={dialogState.showEditDialog}
        onOpenChange={(open) => updateDialogState({ showEditDialog: open })}
        organization={organizationState.selectedOrganization}
        onSubmit={handleUpdateOrganization}
      />
      
      <DeleteOrganizationDialog 
        open={dialogState.showDeleteDialog}
        onOpenChange={(open) => updateDialogState({ showDeleteDialog: open })}
        organization={organizationState.selectedOrganization}
        onDelete={handleDeleteOrganization}
      />
    </div>
  );
};

export default OrganizationsContent;
