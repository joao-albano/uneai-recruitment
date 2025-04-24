
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TasksHeader from './components/TasksHeader';
import TasksList from './components/TasksList';
import TasksKanban from './components/TasksKanban';
import TasksFilterPanel from './components/TasksFilterPanel';
import TasksDialogs from './components/TasksDialogs';
import { useTasksManagement } from './hooks/useTasksManagement';
import { ListChecks, Kanban } from 'lucide-react';
import TasksMetrics from './components/TasksMetrics';

const TasksManagement: React.FC = () => {
  const {
    filteredTasks,
    selectedTask,
    filters,
    activeTab,
    taskDialogOpen,
    contactDialogOpen,
    taskMetrics,
    
    setFilters,
    setActiveTab,
    handleSelectTask,
    handleCreateTask,
    handleEditTask,
    handleDeleteTask,
    handleContactLead,
    handleScheduleContact,
    handleCompleteTask,
    handleAssignTask,
    setTaskDialogOpen,
    setContactDialogOpen,
    handleBulkOperations,
    clearFilters
  } = useTasksManagement();
  
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  
  return (
    <div className="space-y-6">
      <TasksHeader
        onCreateTask={() => setTaskDialogOpen(true)}
      />
      
      <TasksMetrics metrics={taskMetrics} />
      
      <Card className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="mine">Minhas</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="scheduled">Agendadas</TabsTrigger>
              <TabsTrigger value="completed">Concluídas</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <ListChecks className="h-4 w-4" />
                <span>Lista</span>
              </TabsTrigger>
              <TabsTrigger value="kanban" className="flex items-center gap-2">
                <Kanban className="h-4 w-4" />
                <span>Kanban</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <TasksFilterPanel 
          filters={filters} 
          setFilters={setFilters}
          clearFilters={clearFilters}
        />
        
        <div className="mt-4">
          {viewMode === 'list' ? (
            <TasksList 
              tasks={filteredTasks}
              onSelectTask={handleSelectTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onContactLead={handleContactLead}
              onScheduleContact={handleScheduleContact}
              onCompleteTask={handleCompleteTask}
              onBulkOperations={handleBulkOperations}
            />
          ) : (
            <TasksKanban 
              tasks={filteredTasks}
              onSelectTask={handleSelectTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onContactLead={handleContactLead}
              onCompleteTask={handleCompleteTask}
            />
          )}
        </div>
      </Card>
      
      <TasksDialogs 
        taskDialogOpen={taskDialogOpen}
        setTaskDialogOpen={setTaskDialogOpen}
        contactDialogOpen={contactDialogOpen}
        setContactDialogOpen={setContactDialogOpen}
        selectedTask={selectedTask}
        onCreateTask={handleCreateTask}
        onEditTask={handleEditTask}
        onContactLead={handleContactLead}
        onAssignTask={handleAssignTask}
      />
    </div>
  );
};

export default TasksManagement;
