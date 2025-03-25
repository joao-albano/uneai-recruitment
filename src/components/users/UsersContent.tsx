
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import CreateUserDialog from './CreateUserDialog';
import EditUserDialog from './dialogs/EditUserDialog';
import DeleteUserDialog from './DeleteUserDialog';
import { useUsers } from './hooks/useUsers';
import { useAuth } from '@/context/auth';
import { useProduct } from '@/context/ProductContext';
import UsersHeader from './UsersHeader';
import UsersToolbar from './UsersToolbar';
import UsersList from './UsersList';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { RefreshCw } from "lucide-react";

const UsersContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null);
  const { isAdmin, isSuperAdmin, currentUser } = useAuth();
  const { userSubscriptions } = useProduct();
  const { toast } = useToast();
  
  const {
    users,
    loading,
    newUser,
    selectedUser,
    showCreateDialog,
    showEditDialog,
    showDeleteDialog,
    isLastAdmin,
    setNewUser,
    setSelectedUser,
    setShowCreateDialog,
    setShowEditDialog,
    setShowDeleteDialog,
    handleOpenEditDialog,
    handleOpenDeleteDialog,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    fetchUsers
  } = useUsers();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleRetryFetch = () => {
    toast({
      title: "Atualizando",
      description: "Tentando carregar usuários novamente..."
    });
    fetchUsers();
  };
  
  // Extract unique organizations from users
  const organizations = useMemo(() => {
    const orgMap = new Map();
    users.forEach(user => {
      if (user.organizationId && user.organizationName) {
        orgMap.set(user.organizationId, {
          id: user.organizationId,
          name: user.organizationName,
        });
      }
    });
    return Array.from(orgMap.values());
  }, [users]);
  
  // Filter users based on search query and selected organization
  const filteredUsers = useMemo(() => {
    if (loading) {
      return [];
    }
    
    // Start with base filtering based on user role
    let result = isSuperAdmin 
      ? users 
      : users.filter(user => user.organizationId === currentUser?.organizationId);
    
    // Apply organization filter (for super admins only)
    if (isSuperAdmin && selectedOrganization) {
      result = result.filter(user => user.organizationId === selectedOrganization);
    }
    
    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.email.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [users, searchQuery, selectedOrganization, isSuperAdmin, currentUser, loading]);
  
  if (loading) {
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
          
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            <span className="ml-2">Carregando usuários...</span>
          </main>
        </div>
      </div>
    );
  }
  
  const hasError = users.length === 0 && !loading;
  
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
          <UsersHeader userCount={filteredUsers.length} />
          
          <UsersToolbar 
            userCount={filteredUsers.length}
            onOpenCreateDialog={() => setShowCreateDialog(true)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedOrganization={selectedOrganization}
            setSelectedOrganization={setSelectedOrganization}
            organizations={organizations}
          />
          
          {hasError && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Erro ao carregar usuários</AlertTitle>
              <AlertDescription>
                Não foi possível carregar a lista de usuários.
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRetryFetch}
                  className="ml-4"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Tentar novamente
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          <UsersList 
            users={filteredUsers}
            onEdit={handleOpenEditDialog}
            onDelete={handleOpenDeleteDialog}
            isLastAdmin={isLastAdmin}
            subscriptions={userSubscriptions}
            isAdmin={isAdmin}
            isSuperAdmin={isSuperAdmin}
          />
          
          <CreateUserDialog 
            open={showCreateDialog}
            onOpenChange={setShowCreateDialog}
            newUser={newUser}
            setNewUser={setNewUser}
            onSubmit={handleCreateUser}
          />
          
          <EditUserDialog 
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            onSubmit={handleEditUser}
            subscriptions={userSubscriptions}
            isAdmin={isAdmin}
            isSuperAdmin={isSuperAdmin}
          />
          
          <DeleteUserDialog 
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            selectedUser={selectedUser}
            onDelete={handleDeleteUser}
          />
        </main>
      </div>
    </div>
  );
};

export default UsersContent;
