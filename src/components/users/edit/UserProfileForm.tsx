
import React from 'react';
import { UserType, UserRole } from '../types';
import UserNameInput from '../shared/UserNameInput';
import UserEmailInput from '../shared/UserEmailInput';
import UserRoleSelector from '../shared/UserRoleSelector';
import OrganizationSelector from '../shared/OrganizationSelector';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedUser) return;
    
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };
  
  // Handle role change
  const handleRoleChange = (role: string) => {
    if (!selectedUser) return;
    setSelectedUser({ ...selectedUser, role: role as UserRole });
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
  
  // Determine the className based on screen size
  const inputClassName = isMobile ? "grid grid-cols-1 gap-2" : "grid grid-cols-4 items-center gap-4";
  
  return (
    <div className="space-y-4">
      <UserNameInput 
        value={selectedUser.name} 
        onChange={handleChange}
        className={inputClassName}
      />
      
      <UserEmailInput 
        value={selectedUser.email} 
        onChange={handleChange}
        className={inputClassName}
      />
      
      <UserRoleSelector
        selectedRole={selectedUser.role || 'user'}
        onRoleChange={handleRoleChange}
        disabled={isUneCxAdmin && !isSuperAdmin}
        showSuperAdmin={isSuperAdmin}
        className={inputClassName}
      />
      
      <OrganizationSelector
        selectedOrganizationId={selectedUser.organizationId || ''}
        onOrganizationChange={handleOrgChange}
        disabled={!isSuperAdmin}
        className={inputClassName}
      />
    </div>
  );
};

export default UserProfileForm;
