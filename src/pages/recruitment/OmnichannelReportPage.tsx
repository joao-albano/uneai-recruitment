
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/ProductContext';
import OmnichannelReportContent from '@/components/recruitment/omnichannel-report/OmnichannelReportContent';

const OmnichannelReportPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const { setCurrentProduct } = useProduct();
  
  // Set the current product to recruitment when the component mounts
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
      <div className="container mx-auto py-6">
        <OmnichannelReportContent />
      </div>
    </Layout>
  );
};

export default OmnichannelReportPage;
