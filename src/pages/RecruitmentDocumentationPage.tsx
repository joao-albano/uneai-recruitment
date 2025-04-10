
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/ProductContext';
import DeveloperDocumentation from '@/components/recruitment/docs/DeveloperDocumentation';

const RecruitmentDocumentationPage: React.FC = () => {
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
      <DeveloperDocumentation />
    </Layout>
  );
};

export default RecruitmentDocumentationPage;
