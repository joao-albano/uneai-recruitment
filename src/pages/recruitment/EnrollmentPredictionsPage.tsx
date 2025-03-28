
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/ProductContext';
import EnrollmentPredictionDashboard from '@/components/recruitment/prediction/EnrollmentPredictionDashboard';

const EnrollmentPredictionsPage: React.FC = () => {
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
      <EnrollmentPredictionDashboard />
    </Layout>
  );
};

export default EnrollmentPredictionsPage;
