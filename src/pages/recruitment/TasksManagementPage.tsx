
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import TasksManagement from '@/components/recruitment/tasks/TasksManagement';
import { useProduct } from '@/context/ProductContext';

const TasksManagementPage: React.FC = () => {
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
      <TasksManagement />
    </Layout>
  );
};

export default TasksManagementPage;
