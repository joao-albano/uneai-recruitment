
import React from 'react';
import { NewUserType, UserRole } from '../types';
import UserNameInput from '../shared/UserNameInput';
import UserEmailInput from '../shared/UserEmailInput';
import PasswordInput from '../shared/PasswordInput';
import UserRoleSelector from '../shared/UserRoleSelector';
import OrganizationSelector from '../shared/OrganizationSelector';
import { useAuth } from '@/context/auth';

interface CreateUserFormProps {
  newUser: NewUserType;
  setNewUser: React.Dispatch<React.SetStateAction<NewUserType>>;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  newUser,
  setNewUser
}) => {
  const { isSuperAdmin } = useAuth();
  
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
  
  return (
    <div className="grid gap-4 py-4">
      <UserNameInput value={newUser.name} onChange={handleChange} />
      
      <UserEmailInput value={newUser.email} onChange={handleChange} />
      
      <PasswordInput value={newUser.password} onChange={handleChange} />
      
      <UserRoleSelector
        selectedRole={newUser.role}
        onRoleChange={handleRoleChange}
      />
      
      <OrganizationSelector
        selectedOrganizationId={newUser.organizationId || ''}
        onOrganizationChange={handleOrgChange}
        disabled={!isSuperAdmin}
      />
    </div>
  );
};

export default CreateUserForm;
