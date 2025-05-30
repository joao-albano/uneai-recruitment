
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useAuth } from '@/context/auth';
import { fetchOrganizations } from '../api/userManagementApi';

interface Organization {
  id: string;
  name: string;
}

interface OrganizationSelectorProps {
  selectedOrganizationId: string;
  onOrganizationChange: (orgId: string, orgName: string) => void;
  disabled?: boolean;
  className?: string;
}

const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({
  selectedOrganizationId,
  onOrganizationChange,
  disabled = false,
  className = "grid grid-cols-4 items-center gap-4"
}) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, isSuperAdmin } = useAuth();
  
  console.log('Carregando organizações no OrganizationSelector...', { currentUser });
  
  // Carregar organizações disponíveis
  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        console.log('Buscando organizações para o usuário:', currentUser);
        console.log('Status do usuário:', { isSuperAdmin, organizationId: currentUser?.organizationId });
        
        if (!currentUser) {
          setOrganizations([]);
          setLoading(false);
          return;
        }
        
        // Se for super admin, buscar todas as organizações
        // Caso contrário, filtrar apenas pela organização do usuário
        let orgs: Organization[] = [];
        
        if (isSuperAdmin) {
          // Super admin pode ver todas as organizações
          console.log('Buscando todas organizações (super admin)');
          const allOrgs = await fetchOrganizations();
          orgs = allOrgs;
        } else if (currentUser.organizationId) {
          // Admin regular só pode ver sua própria organização
          console.log('Filtrando pela organização do admin:', currentUser.organizationId);
          orgs = [{
            id: currentUser.organizationId,
            name: currentUser.organization?.name || 'Minha Organização'
          }];
        }
        
        setOrganizations(orgs);
      } catch (error) {
        console.error('Erro ao carregar organizações:', error);
        
        // Dados de fallback
        if (currentUser?.organizationId) {
          setOrganizations([{
            id: currentUser.organizationId,
            name: currentUser.organization?.name || 'Minha Organização'
          }]);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadOrganizations();
  }, [currentUser, isSuperAdmin]);
  
  const handleOrganizationSelect = (orgId: string) => {
    const selectedOrg = organizations.find(org => org.id === orgId);
    const orgName = selectedOrg?.name || '';
    onOrganizationChange(orgId, orgName);
  };
  
  return (
    <div className={className}>
      <Label htmlFor="organization" className="text-right">
        Organização
      </Label>
      <Select
        name="organization"
        value={selectedOrganizationId}
        onValueChange={handleOrganizationSelect}
        disabled={disabled || loading || organizations.length === 0 || (!isSuperAdmin && organizations.length === 1)}
      >
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder="Selecione uma organização" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          {organizations.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              {org.name}
            </SelectItem>
          ))}
          {organizations.length === 0 && !loading && (
            <SelectItem value="no-orgs" disabled>
              Nenhuma organização disponível
            </SelectItem>
          )}
          {loading && (
            <SelectItem value="loading" disabled>
              Carregando...
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrganizationSelector;
