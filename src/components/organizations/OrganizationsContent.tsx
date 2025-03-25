
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { fetchOrganizations, createOrganization, updateOrganization, deleteOrganization } from './api';
import { OrganizationType } from './types';
import OrganizationsList from './OrganizationsList';
import OrganizationsHeader from './OrganizationsHeader';
import CreateOrganizationDialog from './CreateOrganizationDialog';
import EditOrganizationDialog from './EditOrganizationDialog';
import DeleteOrganizationDialog from './DeleteOrganizationDialog';

const OrganizationsContent: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<OrganizationType | null>(null);
  const [newOrganization, setNewOrganization] = useState({ name: '', isActive: true });
  const { currentUser, isAdmin, isSuperAdmin } = useAuth();

  // Carregar organizações
  const loadOrganizations = async () => {
    setLoading(true);
    try {
      const orgsData = await fetchOrganizations(currentUser);
      
      if (Array.isArray(orgsData)) {
        // Transformar os dados do formato Supabase para o formato esperado por OrganizationType
        const formattedOrgs: OrganizationType[] = orgsData.map(org => ({
          id: org.id,
          name: org.name,
          isActive: true, // Sem campo is_active no banco, assume true
          isMainOrg: org.is_main_org || false,
          createdAt: org.created_at,
          products: org.products ? org.products.map(p => ({
            type: p.type,
            active: p.active
          })) : []
        }));
        
        setOrganizations(formattedOrgs);
      } else {
        setOrganizations([]);
        toast.error("Formato de resposta inesperado ao buscar organizações");
      }
    } catch (error) {
      console.error("Erro ao carregar organizações:", error);
      toast.error("Erro ao carregar organizações. Tente novamente mais tarde.");
      setOrganizations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Verificar permissões - redirecionar se não for admin ou super admin
    if (!isAdmin && !isSuperAdmin) {
      toast.error("Você não tem permissão para acessar esta página");
      navigate('/');
      return;
    }
    
    loadOrganizations();
  }, [isAdmin, isSuperAdmin, currentUser, navigate]);

  // CRUD Operations
  const handleCreateSubmit = async (values: { name?: string; isActive?: boolean }) => {
    try {
      await createOrganization({
        name: values.name || '',
        isActive: values.isActive || false,
        products: [
          { type: 'retention', active: true },
          { type: 'billing', active: false }
        ]
      });
      
      toast.success("Organização criada com sucesso");
      loadOrganizations();
      setShowCreateDialog(false);
      setNewOrganization({ name: '', isActive: true });
    } catch (error) {
      console.error("Erro ao criar organização:", error);
      toast.error("Erro ao criar organização");
    }
  };
  
  const handleEditSubmit = async (values: { name?: string; isActive?: boolean }) => {
    if (selectedOrg) {
      try {
        await updateOrganization(selectedOrg.id, {
          name: values.name || '',
          isActive: values.isActive || false
        });
        
        toast.success("Organização atualizada com sucesso");
        loadOrganizations();
        setShowEditDialog(false);
      } catch (error) {
        console.error("Erro ao atualizar organização:", error);
        toast.error("Erro ao atualizar organização");
      }
    }
  };
  
  const handleDelete = async () => {
    if (selectedOrg) {
      try {
        await deleteOrganization(selectedOrg.id);
        toast.success("Organização excluída com sucesso");
        loadOrganizations();
        setShowDeleteDialog(false);
      } catch (error) {
        console.error("Erro ao excluir organização:", error);
        toast.error("Erro ao excluir organização");
      }
    }
  };

  // Dialog handlers
  const handleOpenCreateDialog = () => setShowCreateDialog(true);
  const handleOpenEditDialog = (organization: OrganizationType) => {
    setSelectedOrg(organization);
    setShowEditDialog(true);
  };
  const handleOpenDeleteDialog = (organization: OrganizationType) => {
    setSelectedOrg(organization);
    setShowDeleteDialog(true);
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
