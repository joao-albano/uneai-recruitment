
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { UserRole } from '../types';

interface UserRoleSelectorProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
  disabled?: boolean;
  className?: string;
  showSuperAdmin?: boolean;
}

const UserRoleSelector: React.FC<UserRoleSelectorProps> = ({
  selectedRole,
  onRoleChange,
  disabled = false,
  className = "grid grid-cols-4 items-center gap-4",
  showSuperAdmin = false
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
          {showSuperAdmin && (
            <SelectItem value="superadmin">Super Admin</SelectItem>
          )}
          <SelectItem value="admin">Administrador</SelectItem>
          <SelectItem value="gestor">Gestor</SelectItem>
          <SelectItem value="coordenador">Coordenador</SelectItem>
          <SelectItem value="gerente">Gerente</SelectItem>
          <SelectItem value="professor">Professor</SelectItem>
          <SelectItem value="financeiro">Financeiro</SelectItem>
          <SelectItem value="vendedor">Vendedor</SelectItem>
          <SelectItem value="medico">Médico</SelectItem>
          <SelectItem value="atendente">Atendente</SelectItem>
          <SelectItem value="user">Usuário Básico</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserRoleSelector;
