
import React from 'react';
import { DataProvider } from "@/context/DataContext";
import OrganizationsContent from '@/components/organizations/OrganizationsContent';

const OrganizationsPage: React.FC = () => {
  return (
    <DataProvider>
      <OrganizationsContent />
    </DataProvider>
  );
};

export default OrganizationsPage;
