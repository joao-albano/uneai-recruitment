
import React from 'react';
import { DataProvider } from '@/context/DataContext';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  
  return (
    <DataProvider>
      <Layout 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      >
        <div className={`container mx-auto ${isMobile ? 'px-2' : 'px-4'} py-6`}>
          <Dashboard />
        </div>
      </Layout>
    </DataProvider>
  );
};

export default DashboardPage;
