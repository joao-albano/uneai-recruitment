
import React from 'react';
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Users, ShieldAlert } from "lucide-react";
import { UserType } from '../types';

interface UserCardFooterProps {
  user: UserType;
  onManagePermissions: () => void;
}

const UserCardFooter: React.FC<UserCardFooterProps> = ({
  user,
  onManagePermissions
}) => {
  return (
    <CardFooter className="bg-muted/50 py-3 px-6">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {user.role === "admin" 
              ? "Acesso administrativo" 
              : "Acesso de usuário"}
          </span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8"
          onClick={onManagePermissions}
        >
          <ShieldAlert className="h-3.5 w-3.5 mr-1" />
          Permissões
        </Button>
      </div>
    </CardFooter>
  );
};

export default React.memo(UserCardFooter);
