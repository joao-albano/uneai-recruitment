
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Building } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  email: string;
  role: string;
  initials: string;
  organization?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, role, initials, organization }) => {
  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-xl">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{email}</CardDescription>
          <div className="mt-1 flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
              role === 'Super Admin' ? 'bg-amber-100 text-amber-800' :
              role === 'admin' ? 'bg-blue-100 text-blue-800' : 
              'bg-gray-100 text-gray-800'
            }`}>
              {role === 'Super Admin' ? 'Super Admin' : role === 'admin' ? 'Administrador' : 'Usuário'}
            </span>
            
            {organization && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Building className="h-3 w-3" />
                {organization}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProfileHeader;
