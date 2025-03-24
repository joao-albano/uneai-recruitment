
import React from 'react';
import UserCard from "./UserCard";
import { UserType } from './types';

interface UsersListProps {
  users: UserType[];
  onEdit: (user: UserType) => void;
  onDelete: (user: UserType) => void;
  isLastAdmin: boolean;
}

const UsersList: React.FC<UsersListProps> = ({ 
  users, 
  onEdit, 
  onDelete, 
  isLastAdmin 
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
        />
      ))}
    </div>
  );
};

export default UsersList;
