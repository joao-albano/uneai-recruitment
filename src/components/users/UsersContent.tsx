
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InviteUserDialog from './dialogs/InviteUserDialog';
import CreateUserDialog from './CreateUserDialog';
import EditUserDialog from './dialogs/EditUserDialog';
import DeleteUserDialog from './dialogs/DeleteUserDialog';
import { useUsers } from './hooks/useUsers';
import { useAuth } from '@/context/auth';
import { useProduct } from '@/context/ProductContext';
import UsersHeader from './UsersHeader';
import UsersToolbar from './UsersToolbar';
import UsersList from './UsersList';

const UsersContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAdmin, isSuperAdmin, currentUser } = useAuth();
  const { userSubscriptions } = useProduct();
  
  const {
    users,
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
    handleDeleteUser
  } = useUsers();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Filtra usuários com base na organização e nível de acesso
  const filteredUsers = React.useMemo(() => {
    if (isSuperAdmin) {
      // Super admin vê todos os usuários
      return users;
    } else if (isAdmin && currentUser?.organizationId) {
      // Admin da escola vê apenas usuários da mesma organização
      return users.filter(user => user.organizationId === currentUser.organizationId);
    } else {
      // Usuário regular vê apenas usuários da mesma organização
      return users.filter(user => 
        user.organizationId === currentUser?.organizationId
      );
    }
  }, [users, isAdmin, isSuperAdmin, currentUser]);
  
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
          />
          
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
