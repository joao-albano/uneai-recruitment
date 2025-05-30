
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/ProductContext';
import ConversationalAI from '@/components/recruitment/conversation/ConversationalAI';

const ConversationPage: React.FC = () => {
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
      <div className="w-full h-full">
        <ConversationalAI />
      </div>
    </Layout>
  );
};

export default ConversationPage;
