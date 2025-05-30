
import React from 'react';
import { DataProvider } from "@/context/DataContext";
import OrganizationsContent from '@/components/organizations/OrganizationsContent';
import Layout from '@/components/layout/Layout';
import { AdminRoute } from '@/components/auth/ProtectedRoutes';

const OrganizationsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  
  return (
    <AdminRoute>
      <Layout 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      >
        <DataProvider>
          <OrganizationsContent />
        </DataProvider>
      </Layout>
    </AdminRoute>
  );
};

export default OrganizationsPage;
