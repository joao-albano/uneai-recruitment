
import React from 'react';
import { DataProvider } from "@/context/DataContext";
import OrganizationsContent from '@/components/organizations/OrganizationsContent';
import { Layout } from '@/components/layout/Layout';
import { SuperAdminRoute } from '@/components/auth/ProtectedRoutes';

const OrganizationsPage: React.FC = () => {
  return (
    <SuperAdminRoute>
      <Layout>
        <DataProvider>
          <OrganizationsContent />
        </DataProvider>
      </Layout>
    </SuperAdminRoute>
  );
};

export default OrganizationsPage;
