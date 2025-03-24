import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useToast } from "@/hooks/use-toast";
import UserCard from "./UserCard";
import CreateUserDialog from "./CreateUserDialog";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import UserPermissionsHelp from "./UserPermissionsHelp";

export type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
  initials: string;
};

const UsersContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user',
    password: '',
    initials: '',
  });
  
  const [users, setUsers] = useState<UserType[]>([
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', initials: 'AU' },
    { id: 2, name: 'Maria Silva', email: 'maria@example.com', role: 'user', initials: 'MS' },
    { id: 3, name: 'João Santos', email: 'joao@example.com', role: 'user', initials: 'JS' },
  ]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    // Generate initials
    const initials = newUser.name
      .split(' ')
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();
    
    const userToAdd: UserType = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      initials: initials
    };
    
    setUsers([...users, userToAdd]);
    setNewUser({ name: '', email: '', role: 'user', password: '', initials: '' });
    setShowCreateDialog(false);
    
    toast({
      title: "Usuário criado",
      description: `${userToAdd.name} foi adicionado com sucesso.`
    });
  };
  
  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser) return;
    
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return selectedUser;
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setShowEditDialog(false);
    
    toast({
      title: "Usuário atualizado",
      description: `As informações de ${selectedUser.name} foram atualizadas.`
    });
  };
  
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setShowDeleteDialog(false);
    
    toast({
      title: "Usuário removido",
      description: `${selectedUser.name} foi removido com sucesso.`
    });
  };

  const isLastAdmin = users.filter(user => user.role === 'admin').length === 1;
  
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Usuários</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie usuários e suas permissões no sistema
            </p>
          </div>
          
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Usuários</h2>
              <p className="text-sm text-muted-foreground">
                {users.length} usuário(s) cadastrado(s)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <UserPermissionsHelp />
              <Button onClick={() => setShowCreateDialog(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Usuário
              </Button>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map(user => (
              <UserCard 
                key={user.id} 
                user={user} 
                onEdit={(user) => {
                  setSelectedUser(user);
                  setShowEditDialog(true);
                }}
                onDelete={(user) => {
                  setSelectedUser(user);
                  setShowDeleteDialog(true);
                }}
                isLastAdmin={isLastAdmin}
              />
            ))}
          </div>
          
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
