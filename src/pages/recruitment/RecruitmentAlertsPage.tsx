
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import RecruitmentAlertsList from '@/components/recruitment/alerts/RecruitmentAlertsList';
import { useProduct } from '@/context/product';

const RecruitmentAlertsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  
  // Set the current product to 'recruitment'
  useEffect(() => {
    setCurrentProduct('recruitment');
    console.log('Setting product to recruitment in alerts page');
  }, [setCurrentProduct]);
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="container mx-auto py-6">
        <RecruitmentAlertsList />
      </div>
    </Layout>
  );
};

export default RecruitmentAlertsPage;
