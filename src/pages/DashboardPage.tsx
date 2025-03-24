
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import { Layout } from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';

const DashboardPage: React.FC = () => {
  return (
    <DataProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </DataProvider>
  );
};

export default DashboardPage;
