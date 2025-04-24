
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/product';
import TasksManagement from '@/components/recruitment/tasks/TasksManagement';

const TasksListPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  
  // Set the current product to 'recruitment'
  React.useEffect(() => {
    setCurrentProduct('recruitment');
    console.log('Setting product to recruitment in tasks list page');
  }, [setCurrentProduct]);
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Lista de Tarefas</h1>
        <TasksManagement />
      </div>
    </Layout>
  );
};

export default TasksListPage;
