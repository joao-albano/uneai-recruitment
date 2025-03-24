
import React from 'react';
import { UserType } from './types';
import UserCard from './UserCard';
import { ProductSubscription } from '@/context/ProductContext';
import { Users } from 'lucide-react';

interface UsersListProps {
  users: UserType[];
  onEdit: (user: UserType) => void;
  onDelete: (user: UserType) => void;
  isLastAdmin?: boolean;
  subscriptions?: ProductSubscription[];
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  onEdit,
  onDelete,
  isLastAdmin = false,
  subscriptions = [],
  isAdmin = false,
  isSuperAdmin = false
}) => {
  // Improved function with better error handling
  const handleEdit = (user: UserType) => {
    try {
      if (!user) {
        console.error("Tentativa de editar um usuário inválido");
        return;
      }
      
      if (onEdit) {
        // Clone the user to avoid reference issues
        const userClone = JSON.parse(JSON.stringify(user));
        onEdit(userClone);
      }
    } catch (error) {
      console.error("Erro ao processar edição de usuário:", error);
    }
  };

  // Improved function with better error handling
  const handleDelete = (user: UserType) => {
    try {
      if (!user) {
        console.error("Tentativa de excluir um usuário inválido");
        return;
      }
      
      if (onDelete) {
        // Clone the user to avoid reference issues
        const userClone = JSON.parse(JSON.stringify(user));
        onDelete(userClone);
      }
    } catch (error) {
      console.error("Erro ao processar exclusão de usuário:", error);
    }
  };
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLastAdmin={isLastAdmin}
          subscriptions={subscriptions}
          isAdmin={isAdmin}
          isSuperAdmin={isSuperAdmin}
        />
      ))}
      
      {users.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-dashed text-center">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">Nenhum usuário encontrado</h3>
          <p className="text-muted-foreground">
            Clique em "Novo Usuário" para adicionar.
          </p>
        </div>
      )}
    </div>
  );
};

export default UsersList;
