
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import FunnelManagement from '@/components/recruitment/funnel/FunnelManagement';
import { useProduct } from '@/context/ProductContext';

const RecruitmentFunnelPage: React.FC = () => {
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
      <FunnelManagement />
    </Layout>
  );
};

export default RecruitmentFunnelPage;
