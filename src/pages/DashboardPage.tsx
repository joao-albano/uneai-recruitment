
import React from 'react';
import { DataProvider } from '@/context/DataContext';
import { Layout } from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardPage: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <DataProvider>
      <Layout>
        <div className={`container mx-auto ${isMobile ? 'px-2' : 'px-4'}`}>
          <Dashboard />
        </div>
      </Layout>
    </DataProvider>
  );
};

export default DashboardPage;
