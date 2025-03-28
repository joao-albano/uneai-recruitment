
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/ProductContext';

const ReportsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  
  // Set current product to retention
  React.useEffect(() => {
    setCurrentProduct('retention');
  }, [setCurrentProduct]);
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Relatórios</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-muted-foreground">Página de relatórios em desenvolvimento.</p>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsPage;
