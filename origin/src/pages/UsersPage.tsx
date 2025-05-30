
import React from 'react';
import { DataProvider } from "@/context/DataContext";
import UsersContent from '@/components/users/UsersContent';

const UsersPage: React.FC = () => {
  return (
    <DataProvider>
      <UsersContent />
    </DataProvider>
  );
};

export default UsersPage;
