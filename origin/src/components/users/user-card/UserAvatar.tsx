
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserType } from '../types';

interface UserAvatarProps {
  user: UserType;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  // Definindo a cor do avatar baseado no papel do usuário
  const avatarColor = user.isSuperAdmin
    ? "bg-amber-100 text-amber-800"
    : user.role === "admin"
    ? "bg-blue-100 text-blue-800"
    : "bg-gray-100 text-gray-800";

  return (
    <Avatar className={`h-12 w-12 ${avatarColor}`}>
      <AvatarFallback>{user.initials}</AvatarFallback>
    </Avatar>
  );
};

export default React.memo(UserAvatar);
