
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/product';
import RecruitmentScheduleView from '@/components/recruitment/schedule/RecruitmentScheduleView';
import { useSearchParams } from 'react-router-dom';

const RecruitmentSchedulePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action');
  
  // Set the current product to 'recruitment'
  useEffect(() => {
    setCurrentProduct('recruitment');
    console.log('Setting product to recruitment in schedule page');
    
    // If there's an action parameter, expand the sidebar for better context
    if (action) {
      setSidebarCollapsed(false);
    }
  }, [setCurrentProduct, action]);
  
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
