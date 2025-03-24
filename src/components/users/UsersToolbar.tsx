
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import UserPermissionsHelp from "./UserPermissionsHelp";

interface UsersToolbarProps {
  userCount: number;
  onOpenCreateDialog: () => void;
}

const UsersToolbar: React.FC<UsersToolbarProps> = ({ userCount, onOpenCreateDialog }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">Usuários</h2>
        <p className="text-sm text-muted-foreground">
          {userCount} usuário(s) cadastrado(s)
        </p>
      </div>
      <div className="flex items-center gap-2">
        <UserPermissionsHelp />
        <Button onClick={onOpenCreateDialog}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Usuário
        </Button>
      </div>
    </div>
  );
};

export default UsersToolbar;
