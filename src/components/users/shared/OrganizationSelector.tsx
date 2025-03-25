
import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { fetchOrganizations } from '../../organizations/api';
import { useAuth } from '@/context/auth';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadOrganizations = async () => {
      setLoading(true);
      try {
        console.log('Carregando organizações no OrganizationSelector...');
        
        const orgsData = await fetchOrganizations(currentUser);
        
        if (Array.isArray(orgsData) && orgsData.length > 0) {
          console.log('Organizações carregadas com sucesso:', orgsData);
          setOrganizations(orgsData);
        } else {
          console.warn('Nenhuma organização retornada ou array vazio');
          setOrganizations([]);
          
          toast({
            title: "Nenhuma organização encontrada",
            description: "Não foi possível carregar organizações. Verifique se existem organizações cadastradas.",
            variant: "destructive"
          });
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
  }, [currentUser, toast]);
  
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
