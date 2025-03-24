
import React, { useState } from 'react';
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import UsersHeader from "./UsersHeader";
import UsersToolbar from "./UsersToolbar";
import UsersList from "./UsersList";
import CreateUserDialog from "./CreateUserDialog";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import { useUsers } from './hooks/useUsers';
import { useAuth } from '@/context/AuthContext';
import { useProduct } from '@/context/ProductContext';

const UsersContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAdmin } = useAuth();
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
  
  // Filtra usuários da mesma organização, se não for admin
  const filteredUsers = isAdmin 
    ? users 
    : users.filter(user => user.organizationId === "1"); // Mockado, seria o ID real da organização do usuário
  
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
