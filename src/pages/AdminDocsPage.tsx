
import React, { useState } from 'react';
import { DataProvider } from "@/context/DataContext";
import AdminDocsContent from '@/components/admin/docs/AdminDocsContent';
import Layout from '@/components/layout/Layout';

const AdminDocsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <DataProvider>
      <Layout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      >
        <AdminDocsContent />
      </Layout>
    </DataProvider>
  );
};

export default AdminDocsPage;
