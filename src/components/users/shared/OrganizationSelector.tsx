import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { fetchOrganizations } from '../../organizations/api';
import { useAuth } from '@/context/auth';

interface OrganizationSelectorProps {
  selectedOrgId: string;
  onOrgChange: (orgId: string, orgName: string) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({
  selectedOrgId,
  onOrgChange,
  disabled = false,
  label = "Organização",
  className = "grid grid-cols-4 items-center gap-4"
}) => {
  const [organizations, setOrganizations] = useState<{id: string, name: string}[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadOrganizations = async () => {
      setLoading(true);
      try {
        console.log('Carregando organizações no OrganizationSelector...', { currentUser });
        
        // Tenta carregar organizações da API
        const orgsData = await fetchOrganizations(currentUser);
        
        // Se temos dados da API, use-os
        if (Array.isArray(orgsData) && orgsData.length > 0) {
          console.log('Organizações carregadas com sucesso:', orgsData);
          // Only keep id and name for the selector
          const formattedOrgs = orgsData.map(org => ({
            id: org.id,
            name: org.name
          }));
          setOrganizations(formattedOrgs);
        } else {
          // Dados de demonstração para desenvolvimento (quando não há backend)
          console.log('Usando dados de demonstração para organizações');
          
          // Se o usuário atual tiver uma organização, usá-la como fallback
          if (currentUser?.organization?.id) {
            setOrganizations([{
              id: currentUser.organization.id,
              name: currentUser.organization.name || 'Minha Organização'
            }]);
          } else {
            // Organizações de demonstração
            setOrganizations([
              { id: 'org-1', name: 'Escola Modelo' },
              { id: 'org-2', name: 'Instituto de Educação' },
              { id: 'org-3', name: 'Clínica Saúde Total' }
            ]);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar organizações:', error);
        
        // Dados de demonstração em caso de erro
        if (currentUser?.organization?.id) {
          setOrganizations([{
            id: currentUser.organization.id,
            name: currentUser.organization.name || 'Minha Organização'
          }]);
        } else {
          setOrganizations([
            { id: 'org-1', name: 'Organização Demonstração' }
          ]);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadOrganizations();
    
    // Se o usuário atual tem uma organização, mas nenhuma está selecionada, 
    // selecione automaticamente a organização do usuário
    if (currentUser?.organization?.id && !selectedOrgId) {
      onOrgChange(
        currentUser.organization.id, 
        currentUser.organization.name || 'Minha Organização'
      );
    }
  }, [currentUser, selectedOrgId, onOrgChange]);
  
  const handleSelectChange = (value: string) => {
    const selectedOrg = organizations.find(org => org.id === value);
    onOrgChange(value, selectedOrg?.name || '');
  };

  return (
    <div className={className}>
      <Label htmlFor="organizationId" className="text-right">
        {label}
      </Label>
      <Select
        name="organizationId"
        value={selectedOrgId || ''}
        onValueChange={handleSelectChange}
        disabled={disabled || loading}
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
  );
};

export default OrganizationSelector;
