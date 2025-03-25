
import React from 'react';
import { DataProvider } from "@/context/DataContext";
import OrganizationsContent from '@/components/organizations/OrganizationsContent';
import { Layout } from '@/components/layout/Layout';

const OrganizationsPage: React.FC = () => {
  return (
    <Layout>
      <DataProvider>
        <OrganizationsContent />
      </DataProvider>
    </Layout>
  );
};

export default OrganizationsPage;
