
import React from 'react';
import { UserType } from '../types';
import UserNameInput from '../shared/UserNameInput';
import UserEmailInput from '../shared/UserEmailInput';
import UserRoleSelector from '../shared/UserRoleSelector';
import OrganizationSelector from '../shared/OrganizationSelector';

interface UserProfileFormProps {
  selectedUser: UserType;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isSuperAdmin?: boolean;
  isUneCxAdmin?: boolean;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  selectedUser,
  setSelectedUser,
  isSuperAdmin = false,
  isUneCxAdmin = false
}) => {
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedUser) return;
    
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };
  
  // Handle role change
  const handleRoleChange = (role: string) => {
    if (!selectedUser) return;
    setSelectedUser({ ...selectedUser, role });
  };
  
  // Handle organization change
  const handleOrgChange = (orgId: string, orgName: string) => {
    if (!selectedUser) return;
    
    setSelectedUser({
      ...selectedUser,
      organizationId: orgId,
      organizationName: orgName
    });
  };
  
  return (
    <div className="space-y-4">
      <UserNameInput value={selectedUser.name} onChange={handleChange} />
      
      <UserEmailInput value={selectedUser.email} onChange={handleChange} />
      
      <UserRoleSelector
        selectedRole={selectedUser.role || 'user'}
        onRoleChange={handleRoleChange}
        disabled={isUneCxAdmin && !isSuperAdmin}
      />
      
      <OrganizationSelector
        selectedOrgId={selectedUser.organizationId || ''}
        onOrgChange={handleOrgChange}
        disabled={!isSuperAdmin}
      />
    </div>
  );
};

export default UserProfileForm;
