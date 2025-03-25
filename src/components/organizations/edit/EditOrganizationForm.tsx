
import React from 'react';
import { OrganizationType } from '../types';
import OrganizationNameInput from '../shared/OrganizationNameInput';
import OrganizationActiveToggle from '../shared/OrganizationActiveToggle';
import OrganizationProductsForm from './OrganizationProductsForm';
import { useAuth } from '@/context/auth';

interface EditOrganizationFormProps {
  organization: OrganizationType;
  setOrganization: React.Dispatch<React.SetStateAction<OrganizationType | null>>;
}

const EditOrganizationForm: React.FC<EditOrganizationFormProps> = ({
  organization,
  setOrganization
}) => {
  const { isSuperAdmin } = useAuth();
  
  // Handler para alterar o nome
  const handleNameChange = (name: string) => {
    setOrganization(prev => prev ? { ...prev, name } : null);
  };
  
  // Handler para alterar o status ativo
  const handleActiveChange = (isActive: boolean) => {
    setOrganization(prev => prev ? { ...prev, isActive } : null);
  };

  return (
    <div className="space-y-6">
      <OrganizationNameInput 
        value={organization.name}
        onChange={handleNameChange}
      />
      
      <OrganizationActiveToggle
        value={organization.isActive}
        onChange={handleActiveChange}
      />
      
      <OrganizationProductsForm
        selectedOrganization={organization}
        setSelectedOrganization={setOrganization}
        isSuperAdmin={isSuperAdmin}
      />
    </div>
  );
};

export default EditOrganizationForm;
