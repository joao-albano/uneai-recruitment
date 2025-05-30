
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Building } from "lucide-react";
import { UserType } from '../types';
import { userProfileDescriptions } from '../permissions/types';

interface UserInfoProps {
  user: UserType;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const getRoleBadgeClasses = (role: string, isSuperAdmin: boolean | undefined) => {
    if (isSuperAdmin) {
      return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    }
    
    switch (role) {
      case 'admin':
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case 'gestor':
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case 'coordenador':
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case 'gerente':
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100";
      case 'professor':
        return "bg-cyan-100 text-cyan-800 hover:bg-cyan-100";
      case 'financeiro':
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case 'vendedor':
        return "bg-pink-100 text-pink-800 hover:bg-pink-100";
      case 'atendente':
        return "bg-teal-100 text-teal-800 hover:bg-teal-100";
      default:
        return "";
    }
  };

  const getRoleName = (role: string, isSuperAdmin: boolean | undefined) => {
    if (isSuperAdmin) {
      return "Super Admin";
    }
    
    const profileInfo = Object.entries(userProfileDescriptions).find(([key]) => key === role);
    if (profileInfo) {
      return profileInfo[1].title;
    }
    
    return role === 'admin' ? "Administrador" : "Usuário Básico";
  };
  
  return (
    <div>
      <h3 className="font-medium text-base">{user.name}</h3>
      <p className="text-sm text-muted-foreground">{user.email}</p>
      
      <div className="flex items-center gap-2 mt-1">
        <Badge 
          variant={user.role === "user" ? "secondary" : "default"}
          className={getRoleBadgeClasses(user.role, user.isSuperAdmin)}
        >
          {getRoleName(user.role, user.isSuperAdmin)}
        </Badge>
        
        {user.organizationName && (
          <Badge variant="outline" className="text-xs">
            <Building className="h-3 w-3 mr-1" />
            {user.organizationName}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default React.memo(UserInfo);
