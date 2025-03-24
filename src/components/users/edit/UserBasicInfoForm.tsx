
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserType } from '../types';
import { Building } from 'lucide-react';
import { updateUserName, updateUserEmail, updateUserRole } from '../utils/userUtils';

interface UserBasicInfoFormProps {
  selectedUser: UserType;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isSuperAdmin: boolean;
  isUneCxAdmin: boolean;
}

const UserBasicInfoForm: React.FC<UserBasicInfoFormProps> = ({
  selectedUser, 
  setSelectedUser,
  isSuperAdmin, 
  isUneCxAdmin
}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedUser = updateUserName(selectedUser, e.target.value);
    if (updatedUser) setSelectedUser(updatedUser);
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedUser = updateUserEmail(selectedUser, e.target.value);
    if (updatedUser) setSelectedUser(updatedUser);
  };
  
  const handleRoleChange = (value: string) => {
    const updatedUser = updateUserRole(selectedUser, value);
    if (updatedUser) setSelectedUser(updatedUser);
  };
  
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="edit-name">Nome</Label>
        <Input 
          id="edit-name" 
          value={selectedUser.name}
          onChange={handleNameChange}
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="edit-email">Email</Label>
        <Input 
          id="edit-email" 
          type="email"
          value={selectedUser.email}
          onChange={handleEmailChange}
          required
        />
      </div>
      
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="edit-role">Função</Label>
          {selectedUser.organizationName && (
            <Badge variant="outline" className="text-xs">
              <Building className="h-3 w-3 mr-1" />
              {selectedUser.organizationName}
            </Badge>
          )}
        </div>
        
        <Select 
          value={selectedUser.role}
          onValueChange={handleRoleChange}
          disabled={isUneCxAdmin && !isSuperAdmin}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma função" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">Usuário</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
            {isSuperAdmin && (
              <SelectItem value="superadmin">Super Admin (UNE CX)</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default UserBasicInfoForm;
