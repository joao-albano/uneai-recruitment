
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Dashboard from '@/components/dashboard/Dashboard';
import { Layout } from '@/components/layout/Layout';

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
