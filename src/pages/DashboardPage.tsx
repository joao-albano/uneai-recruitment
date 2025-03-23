
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import { Layout } from '@/components/layout/Layout';
import { AppStateProvider } from '@/context/app/AppStateContext';

const DashboardPage: React.FC = () => {
  return (
    <AppStateProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </AppStateProvider>
  );
};

export default DashboardPage;
