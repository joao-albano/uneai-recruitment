
import React from 'react';
import UsersHeader from '../UsersHeader';
import UsersToolbar from '../UsersToolbar';
import UsersList from '../UsersList';
import UserErrorAlert from '../alerts/UserErrorAlert';
import { UserType } from '../types';
import { ProductSubscription } from '@/context/ProductContext';

interface UserMainContentProps {
  filteredUsers: UserType[];
  hasError: boolean;
  handleRetryFetch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedOrganization: string | null;
  setSelectedOrganization: (orgId: string | null) => void;
  organizations: { id: string; name: string }[];
  setShowCreateDialog: (show: boolean) => void;
  handleOpenEditDialog: (user: UserType) => void;
  handleOpenDeleteDialog: (user: UserType) => void;
  isLastAdmin: boolean;
  userSubscriptions: ProductSubscription[];
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const UserMainContent: React.FC<UserMainContentProps> = ({
  filteredUsers,
  hasError,
  handleRetryFetch,
  searchQuery,
  setSearchQuery,
  selectedOrganization,
  setSelectedOrganization,
  organizations,
  setShowCreateDialog,
  handleOpenEditDialog,
  handleOpenDeleteDialog,
  isLastAdmin,
  userSubscriptions,
  isAdmin,
  isSuperAdmin
}) => {
  return (
    <>
      <UsersHeader userCount={filteredUsers.length} />
      
      <UsersToolbar 
        userCount={filteredUsers.length}
        onOpenCreateDialog={() => setShowCreateDialog(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedOrganization={selectedOrganization}
        setSelectedOrganization={setSelectedOrganization}
        organizations={organizations}
      />
      
      {hasError && (
        <UserErrorAlert onRetry={handleRetryFetch} />
      )}
      
      <UsersList 
        users={filteredUsers}
        onEdit={handleOpenEditDialog}
        onDelete={handleOpenDeleteDialog}
        isLastAdmin={isLastAdmin}
        subscriptions={userSubscriptions}
        isAdmin={isAdmin}
        isSuperAdmin={isSuperAdmin}
      />
    </>
  );
};

export default UserMainContent;
