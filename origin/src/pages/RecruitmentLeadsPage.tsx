
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import LeadsManagement from '@/components/recruitment/leads/LeadsManagement';
import { useProduct } from '@/context/ProductContext';

const RecruitmentLeadsPage: React.FC = () => {
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
      <LeadsManagement />
    </Layout>
  );
};

export default RecruitmentLeadsPage;
