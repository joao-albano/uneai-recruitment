
import React, { useEffect } from 'react';
import { UserType } from '../types';
import { useAuth } from '@/context/auth';
import UserProfileForm from './UserProfileForm';

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
  const { isAdmin } = useAuth();
  
  useEffect(() => {
    console.log('UserBasicInfoForm - selectedUser atualizado:', selectedUser);
  }, [selectedUser]);
  
  if (!selectedUser) return null;
  
  return (
    <UserProfileForm
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
      isSuperAdmin={isSuperAdmin}
      isUneCxAdmin={isUneCxAdmin}
    />
  );
};

export default UserBasicInfoForm;
