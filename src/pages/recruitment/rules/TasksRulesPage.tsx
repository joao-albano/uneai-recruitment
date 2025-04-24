
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/product';
import TasksRulesManagement from '@/components/recruitment/tasks/TasksRulesManagement';

const TasksRulesPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  
  // Set the current product to 'recruitment'
  React.useEffect(() => {
    setCurrentProduct('recruitment');
    console.log('Setting product to recruitment in tasks rules page');
  }, [setCurrentProduct]);
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Gerenciamento de Tarefas</h1>
        <TasksRulesManagement />
      </div>
    </Layout>
  );
};

export default TasksRulesPage;
