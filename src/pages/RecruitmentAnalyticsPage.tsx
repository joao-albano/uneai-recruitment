
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/ProductContext';
import AnalyticsManagement from '@/components/recruitment/analytics/AnalyticsManagement';

const RecruitmentAnalyticsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  
  // Definir o produto atual como 'recruitment'
  React.useEffect(() => {
    setCurrentProduct('recruitment');
  }, [setCurrentProduct]);
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <AnalyticsManagement />
    </Layout>
  );
};

export default RecruitmentAnalyticsPage;
