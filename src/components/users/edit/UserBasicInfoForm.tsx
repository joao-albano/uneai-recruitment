
import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { UserType } from '../types';
import { fetchOrganizations } from '../api/userManagementApi';

interface UserBasicInfoFormProps {
  selectedUser: UserType;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isSuperAdmin?: boolean;
  isUneCxAdmin?: boolean;
}

const UserBasicInfoForm: React.FC<UserBasicInfoFormProps> = ({
  selectedUser,
  setSelectedUser,
  isSuperAdmin = false,
  isUneCxAdmin = false
}) => {
  const [organizations, setOrganizations] = useState<{id: string, name: string}[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Carregar organizações disponíveis para super admin
  useEffect(() => {
    const loadOrganizations = async () => {
      if (isSuperAdmin) {
        setLoading(true);
        try {
          const orgsData = await fetchOrganizations();
          console.log('Organizações carregadas no UserBasicInfoForm:', orgsData);
          setOrganizations(orgsData || []);
        } catch (error) {
          console.error('Erro ao carregar organizações:', error);
          // Não quebrar a interface em caso de erro
          setOrganizations([]);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadOrganizations();
  }, [isSuperAdmin]);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedUser) return;
    
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };
  
  // Handle select changes
  const handleSelectChange = (field: string, value: string) => {
    if (!selectedUser) return;
    
    setSelectedUser(prev => {
      if (!prev) return null;
      
      // Se estiver alterando a organização, atualizar também o nome da organização
      if (field === 'organizationId') {
        const selectedOrg = organizations.find(org => org.id === value);
        return {
          ...prev,
          [field]: value,
          organizationName: selectedOrg?.name || prev.organizationName
        };
      }
      
      return { ...prev, [field]: value };
    });
  };
  
  if (!selectedUser) return null;
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nome
        </Label>
        <Input
          id="name"
          name="name"
          value={selectedUser.name || ''}
          onChange={handleChange}
          className="col-span-3"
          required
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={selectedUser.email || ''}
          onChange={handleChange}
          className="col-span-3"
          required
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="role" className="text-right">
          Perfil
        </Label>
        <Select
          name="role"
          value={selectedUser.role || 'user'}
          onValueChange={(value) => handleSelectChange('role', value)}
          disabled={isUneCxAdmin && !isSuperAdmin}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Selecione um perfil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">Usuário</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {isSuperAdmin && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="organizationId" className="text-right">
            Organização
          </Label>
          <Select
            name="organizationId"
            value={selectedUser.organizationId || ''}
            onValueChange={(value) => handleSelectChange('organizationId', value)}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder={loading ? "Carregando..." : "Selecione uma organização"} />
            </SelectTrigger>
            <SelectContent>
              {organizations.length > 0 ? (
                organizations.map(org => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="empty" disabled>
                  {loading ? "Carregando organizações..." : "Nenhuma organização disponível"}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default UserBasicInfoForm;
