
import React from 'react';
import UserCard from "./UserCard";
import { UserType } from './types';
import { ProductSubscription } from '@/context/ProductContext';

interface UsersListProps {
  users: UserType[];
  onEdit: (user: UserType) => void;
  onDelete: (user: UserType) => void;
  isLastAdmin: boolean;
  subscriptions: ProductSubscription[];
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const UsersList: React.FC<UsersListProps> = ({ 
  users, 
  onEdit, 
  onDelete, 
  isLastAdmin,
  subscriptions,
  isAdmin,
  isSuperAdmin
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          onEdit={onEdit}
          onDelete={onDelete}
          isLastAdmin={isLastAdmin}
          userSubscriptions={subscriptions.filter(sub => 
            sub.organizationId === user.organizationId
          )}
          isAdmin={isAdmin}
          isSuperAdmin={isSuperAdmin}
        />
      ))}
    </div>
  );
};

export default UsersList;
