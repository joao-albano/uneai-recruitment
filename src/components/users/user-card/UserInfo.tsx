
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Building } from "lucide-react";
import { UserType } from '../types';

interface UserInfoProps {
  user: UserType;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div>
      <h3 className="font-medium text-base">{user.name}</h3>
      <p className="text-sm text-muted-foreground">{user.email}</p>
      
      <div className="flex items-center gap-2 mt-1">
        <Badge 
          variant={user.role === "admin" ? "default" : "secondary"}
          className={user.role === "admin" 
            ? (user.isSuperAdmin ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : "bg-blue-100 text-blue-800 hover:bg-blue-100") 
            : ""
          }
        >
          {user.isSuperAdmin 
            ? "Super Admin" 
            : user.role === "admin" 
            ? "Admin" 
            : "Usuário"}
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
