
import React, { useCallback, memo, useMemo } from 'react';
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
  // Create stable callback functions
  const handleEdit = useCallback((user: UserType) => {
    if (!user) {
      console.error("Tentativa de editar um usuário inválido");
      return;
    }
    
    // Clone the user to avoid reference issues
    const userClone = structuredClone(user);
    onEdit(userClone);
  }, [onEdit]);

  const handleDelete = useCallback((user: UserType) => {
    if (!user) {
      console.error("Tentativa de excluir um usuário inválido");
      return;
    }
    
    // Using structuredClone instead of JSON.parse/stringify for better performance
    const userClone = structuredClone(user);
    onDelete(userClone);
  }, [onDelete]);
  
  // Memoize the empty state to prevent unnecessary renders
  const emptyState = useMemo(() => (
    <div className="col-span-full flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-dashed text-center">
      <Users className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-1">Nenhum usuário encontrado</h3>
      <p className="text-muted-foreground">
        Clique em "Novo Usuário" para adicionar.
      </p>
    </div>
  ), []);
  
  // Memoize the user card list
  const userCards = useMemo(() => {
    return users.map(user => (
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
    ));
  }, [users, handleEdit, handleDelete, isLastAdmin, subscriptions, isAdmin, isSuperAdmin]);
  
  // Render all user cards using the memoized handlers
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
      {users.length > 0 ? userCards : emptyState}
    </div>
  );
};

// Memoize the entire component to prevent unnecessary rerenders
export default memo(UsersList);
