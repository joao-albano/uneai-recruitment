
import React from 'react';
import { NewUserType, UserRole } from '../types';
import UserNameInput from '../shared/UserNameInput';
import UserEmailInput from '../shared/UserEmailInput';
import PasswordInput from '../shared/PasswordInput';
import UserRoleSelector from '../shared/UserRoleSelector';
import OrganizationSelector from '../shared/OrganizationSelector';
import { useAuth } from '@/context/auth';
import { useIsMobile } from '@/hooks/use-mobile';

interface CreateUserFormProps {
  newUser: NewUserType;
  setNewUser: React.Dispatch<React.SetStateAction<NewUserType>>;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  newUser,
  setNewUser
}) => {
  const { isSuperAdmin } = useAuth();
  const isMobile = useIsMobile();
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };
  
  // Handle select changes
  const handleRoleChange = (role: string) => {
    setNewUser({ ...newUser, role: role as UserRole });
  };
  
  // Handle organization change
  const handleOrgChange = (orgId: string, orgName: string) => {
    setNewUser({
      ...newUser,
      organizationId: orgId,
      organizationName: orgName
    });
  };
  
  // Determine the className based on screen size
  const inputClassName = isMobile ? "grid grid-cols-1 gap-2" : "grid grid-cols-4 items-center gap-4";
  
  return (
    <div className="grid gap-4 py-4">
      <UserNameInput 
        value={newUser.name} 
        onChange={handleChange} 
        className={inputClassName}
      />
      
      <UserEmailInput 
        value={newUser.email} 
        onChange={handleChange} 
        className={inputClassName}
      />
      
      <PasswordInput 
        value={newUser.password} 
        onChange={handleChange} 
        className={inputClassName}
      />
      
      <UserRoleSelector
        selectedRole={newUser.role}
        onRoleChange={handleRoleChange}
        showSuperAdmin={isSuperAdmin}
        className={inputClassName}
      />
      
      <OrganizationSelector
        selectedOrganizationId={newUser.organizationId || ''}
        onOrganizationChange={handleOrgChange}
        disabled={!isSuperAdmin}
        className={inputClassName}
      />
    </div>
  );
};

export default CreateUserForm;
