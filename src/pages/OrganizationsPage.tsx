
import React from 'react';
import { DataProvider } from "@/context/DataContext";
import OrganizationsContent from '@/components/organizations/OrganizationsContent';
import { Layout } from '@/components/layout/Layout';
import { AdminRoute } from '@/components/auth/ProtectedRoutes';

const OrganizationsPage: React.FC = () => {
  return (
    <AdminRoute>
      <Layout>
        <DataProvider>
          <OrganizationsContent />
        </DataProvider>
      </Layout>
    </AdminRoute>
  );
};

export default OrganizationsPage;
