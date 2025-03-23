
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  name: string;
  email: string;
  role: string;
  initials: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, role, initials }) => {
  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-xl">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{email}</CardDescription>
          <div className="mt-1">
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              {role === 'admin' ? 'Administrador' : 'Usuário'}
            </span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProfileHeader;
