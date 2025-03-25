
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface UserRoleSelectorProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
  disabled?: boolean;
  className?: string;
}

const UserRoleSelector: React.FC<UserRoleSelectorProps> = ({
  selectedRole,
  onRoleChange,
  disabled = false,
  className = "grid grid-cols-4 items-center gap-4"
}) => {
  return (
    <div className={className}>
      <Label htmlFor="role" className="text-right">
        Perfil
      </Label>
      <Select
        name="role"
        value={selectedRole || 'user'}
        onValueChange={onRoleChange}
        disabled={disabled}
      >
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder="Selecione um perfil" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="user">Usuário</SelectItem>
          <SelectItem value="admin">Administrador</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserRoleSelector;
