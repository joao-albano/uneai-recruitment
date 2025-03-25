
import React, { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth';
import { useProduct } from '@/context/ProductContext';
import { useUsers } from './hooks/useUsers';
import UserLayout from './layout/UserLayout';
import UserLoadingState from './loading/UserLoadingState';
import UserMainContent from './content/UserMainContent';
import UserDialogsContainer from './dialogs/UserDialogsContainer';

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
      <UserLoadingState
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
    );
  }
  
  const hasError = users.length === 0 && !loading;
  
  return (
    <UserLayout
      sidebarOpen={sidebarOpen}
      toggleSidebar={toggleSidebar}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <UserMainContent
        filteredUsers={filteredUsers}
        hasError={hasError}
        handleRetryFetch={handleRetryFetch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedOrganization={selectedOrganization}
        setSelectedOrganization={setSelectedOrganization}
        organizations={organizations}
        setShowCreateDialog={setShowCreateDialog}
        handleOpenEditDialog={handleOpenEditDialog}
        handleOpenDeleteDialog={handleOpenDeleteDialog}
        isLastAdmin={isLastAdmin}
        userSubscriptions={userSubscriptions}
        isAdmin={isAdmin}
        isSuperAdmin={isSuperAdmin}
      />
      
      <UserDialogsContainer
        showCreateDialog={showCreateDialog}
        showEditDialog={showEditDialog}
        showDeleteDialog={showDeleteDialog}
        setShowCreateDialog={setShowCreateDialog}
        setShowEditDialog={setShowEditDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        newUser={newUser}
        selectedUser={selectedUser}
        setNewUser={setNewUser}
        setSelectedUser={setSelectedUser}
        handleCreateUser={handleCreateUser}
        handleEditUser={handleEditUser}
        handleDeleteUser={handleDeleteUser}
        userSubscriptions={userSubscriptions}
        isAdmin={isAdmin}
        isSuperAdmin={isSuperAdmin}
      />
    </UserLayout>
  );
};

export default UsersContent;
