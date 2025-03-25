
import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { UserType } from '../types';
import { fetchOrganizations } from '../api/userManagementApi';
import { useToast } from '@/hooks/use-toast';

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
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // Carregar organizações disponíveis
  useEffect(() => {
    const loadOrganizations = async () => {
      setLoading(true);
      try {
        console.log('Carregando organizações no UserBasicInfoForm...');
        console.log('Selected user org ID:', selectedUser.organizationId);
        
        const orgsData = await fetchOrganizations();
        
        if (Array.isArray(orgsData) && orgsData.length > 0) {
          console.log('Organizações carregadas com sucesso:', orgsData);
          setOrganizations(orgsData);
          
          // Se o usuário selecionado não tiver um nome de organização, mas tiver um ID,
          // buscar o nome correspondente
          if (selectedUser.organizationId && !selectedUser.organizationName) {
            const matchingOrg = orgsData.find(org => org.id === selectedUser.organizationId);
            if (matchingOrg) {
              console.log('Atualizando nome da organização para:', matchingOrg.name);
              setSelectedUser({
                ...selectedUser,
                organizationName: matchingOrg.name
              });
            }
          }
        } else {
          console.warn('Nenhuma organização retornada ou array vazio');
          setOrganizations([]);
          
          if (isSuperAdmin) {
            toast({
              title: "Nenhuma organização encontrada",
              description: "Não foi possível carregar organizações. Verifique se existem organizações cadastradas.",
              variant: "destructive" // Alterado de "warning" para "destructive"
            });
          }
        }
      } catch (error) {
        console.error('Erro ao carregar organizações:', error);
        setOrganizations([]);
        
        toast({
          title: "Erro ao carregar organizações",
          description: "Ocorreu um erro ao buscar a lista de organizações.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadOrganizations();
  }, [selectedUser.organizationId, setSelectedUser, isSuperAdmin, toast]);
  
  useEffect(() => {
    // Log para debug quando o selectedUser muda
    console.log('UserBasicInfoForm - selectedUser atualizado:', selectedUser);
    console.log('UserBasicInfoForm - organizationId:', selectedUser.organizationId);
    console.log('UserBasicInfoForm - organizationName:', selectedUser.organizationName);
  }, [selectedUser]);
  
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
        console.log('Organização selecionada:', selectedOrg);
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
  
  console.log('UserBasicInfoForm rendering with organizationId:', selectedUser.organizationId);
  console.log('Available organizations:', organizations);
  
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
      
      {/* Dropdown de organizações */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="organizationId" className="text-right">
          Organização
        </Label>
        <Select
          name="organizationId"
          value={selectedUser.organizationId || ''}
          onValueChange={(value) => handleSelectChange('organizationId', value)}
          disabled={!isSuperAdmin}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder={loading ? "Carregando..." : "Selecione uma organização"} />
          </SelectTrigger>
          <SelectContent className="bg-popover">
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
    </div>
  );
};

export default UserBasicInfoForm;
