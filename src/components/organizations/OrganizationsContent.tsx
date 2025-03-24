
import React, { useState } from 'react';
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import OrganizationsHeader from "./OrganizationsHeader";
import OrganizationsList from "./OrganizationsList";
import { useAuth } from '@/context/auth';
import { useOrganizations } from './hooks/useOrganizations';
import CreateOrganizationDialog from './CreateOrganizationDialog';
import EditOrganizationDialog from './EditOrganizationDialog';
import DeleteOrganizationDialog from './DeleteOrganizationDialog';

const OrganizationsContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isSuperAdmin } = useAuth();
  
  const {
    organizations,
    newOrganization,
    selectedOrganization,
    showCreateDialog,
    showEditDialog,
    showDeleteDialog,
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
  } = useOrganizations();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Only super admins should be able to access this page
  if (!isSuperAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md max-w-md text-center">
          <h2 className="text-lg font-semibold mb-2">Acesso Restrito</h2>
          <p>Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={toggleSidebar} 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          toggleSidebar={toggleSidebar} 
          sidebarCollapsed={sidebarCollapsed} 
        />
        
        <main className="flex-1 p-6">
          <OrganizationsHeader organizationCount={organizations.length} />
          
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => setShowCreateDialog(true)}
              className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              <span>Nova Organização</span>
            </button>
          </div>
          
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
            onSubmit={handleCreateOrganization}
          />
          
          <EditOrganizationDialog 
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            selectedOrganization={selectedOrganization}
            setSelectedOrganization={setSelectedOrganization}
            onSubmit={handleEditOrganization}
          />
          
          <DeleteOrganizationDialog 
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            selectedOrganization={selectedOrganization}
            onDelete={handleDeleteOrganization}
          />
        </main>
      </div>
    </div>
  );
};

export default OrganizationsContent;
