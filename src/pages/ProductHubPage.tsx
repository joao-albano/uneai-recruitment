
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProductHub from '@/components/product-hub/ProductHub';

const ProductHubPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  
  return (
    <Layout 
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
      hideSidebar={true} // Ocultando a sidebar na página de hub
    >
      <ProductHub />
    </Layout>
  );
};

export default ProductHubPage;
