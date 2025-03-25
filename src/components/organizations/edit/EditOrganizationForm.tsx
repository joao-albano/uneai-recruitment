
import React from 'react';
import { OrganizationType } from '../types';
import OrganizationNameInput from '../shared/OrganizationNameInput';
import OrganizationActiveToggle from '../shared/OrganizationActiveToggle';
import OrganizationProductsForm from './OrganizationProductsForm';
import { useAuth } from '@/context/auth';

interface EditOrganizationFormProps {
  organization: OrganizationType;
  setOrganization: React.Dispatch<React.SetStateAction<OrganizationType | null>>;
  onSubmit?: (values: { name?: string; isActive?: boolean }) => void;
}

const EditOrganizationForm: React.FC<EditOrganizationFormProps> = ({
  organization,
  setOrganization,
  onSubmit
}) => {
  const { isSuperAdmin } = useAuth();
  
  // Handler para alterar o nome
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setOrganization(prev => prev ? { ...prev, name } : null);
  };
  
  // Handler para alterar o status ativo
  const handleActiveChange = (isActive: boolean) => {
    setOrganization(prev => prev ? { ...prev, isActive } : null);
  };

  return (
    <div className="space-y-6" id="edit-organization-form">
      <OrganizationNameInput 
        value={organization.name}
        onChange={handleNameChange}
      />
      
      <OrganizationActiveToggle
        isActive={organization.isActive}
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
