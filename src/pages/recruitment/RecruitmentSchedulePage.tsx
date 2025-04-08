
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/product';
import RecruitmentScheduleView from '@/components/recruitment/schedule/RecruitmentScheduleView';

const RecruitmentSchedulePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  
  // Set the current product to 'recruitment'
  useEffect(() => {
    setCurrentProduct('recruitment');
    console.log('Setting product to recruitment in schedule page');
  }, [setCurrentProduct]);
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="container mx-auto py-6">
        <RecruitmentScheduleView />
      </div>
    </Layout>
  );
};

export default RecruitmentSchedulePage;
