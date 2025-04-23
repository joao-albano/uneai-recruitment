
import React from 'react';
import { useTasksManagement } from './hooks/useTasksManagement';
import TasksHeader from './components/TasksHeader';
import TasksFilters from './components/TasksFilters';
import TasksList from './components/TasksList';
import TaskDetails from './components/TaskDetails';
import TasksMetrics from './components/TasksMetrics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskDistribution from './components/TaskDistribution';
import TasksDialogs from './components/TasksDialogs';

const TasksManagement: React.FC = () => {
  const {
    // Estados
    tasks,
    filteredTasks,
    selectedTask,
    filters,
    activeTab,
    taskDialogOpen,
    distributionDialogOpen,
    contactDialogOpen,
    taskMetrics,
    
    // Ações
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
    handleDistributeTasks,
    setTaskDialogOpen,
    setDistributionDialogOpen,
    setContactDialogOpen,
    handleBulkOperations,
    clearFilters
  } = useTasksManagement();
  
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 max-w-screen-2xl">
      <TasksHeader 
        onCreateTask={() => setTaskDialogOpen(true)} 
        onDistributeTasks={() => setDistributionDialogOpen(true)}
        metrics={taskMetrics}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList>
          <TabsTrigger value="all">Todas as Tarefas</TabsTrigger>
          <TabsTrigger value="mine">Minhas Tarefas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="scheduled">Agendadas</TabsTrigger>
          <TabsTrigger value="completed">Concluídas</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TasksFilters 
            filters={filters} 
            onFilterChange={setFilters} 
            onClearFilters={clearFilters}
          />
        </div>
        
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TabsContent value="all" className="m-0">
              <TasksList 
                tasks={filteredTasks} 
                onSelectTask={handleSelectTask} 
                onContactLead={handleContactLead}
                onScheduleContact={handleScheduleContact}
                onAssignTask={handleAssignTask}
                onCompleteTask={handleCompleteTask}
                onBulkOperations={handleBulkOperations}
              />
            </TabsContent>
            
            <TabsContent value="mine" className="m-0">
              <TasksList 
                tasks={filteredTasks.filter(task => task.assignedTo === 'currentUser')} 
                onSelectTask={handleSelectTask}
                onContactLead={handleContactLead}
                onScheduleContact={handleScheduleContact}
                onAssignTask={handleAssignTask}
                onCompleteTask={handleCompleteTask}
                onBulkOperations={handleBulkOperations}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="m-0">
              <TasksList 
                tasks={filteredTasks.filter(task => task.status === 'pendente')} 
                onSelectTask={handleSelectTask}
                onContactLead={handleContactLead}
                onScheduleContact={handleScheduleContact}
                onAssignTask={handleAssignTask}
                onCompleteTask={handleCompleteTask}
                onBulkOperations={handleBulkOperations}
              />
            </TabsContent>
            
            <TabsContent value="scheduled" className="m-0">
              <TasksList 
                tasks={filteredTasks.filter(task => task.status === 'agendada')} 
                onSelectTask={handleSelectTask}
                onContactLead={handleContactLead}
                onScheduleContact={handleScheduleContact}
                onAssignTask={handleAssignTask}
                onCompleteTask={handleCompleteTask}
                onBulkOperations={handleBulkOperations}
              />
            </TabsContent>
            
            <TabsContent value="completed" className="m-0">
              <TasksList 
                tasks={filteredTasks.filter(task => task.status === 'concluída')} 
                onSelectTask={handleSelectTask}
                onContactLead={handleContactLead}
                onScheduleContact={handleScheduleContact}
                onAssignTask={handleAssignTask}
                onCompleteTask={handleCompleteTask}
                onBulkOperations={handleBulkOperations}
              />
            </TabsContent>
          </div>
          
          <div className="lg:col-span-1">
            {selectedTask ? (
              <TaskDetails 
                task={selectedTask} 
                onEdit={() => handleEditTask(selectedTask)} 
                onDelete={() => handleDeleteTask(selectedTask.id)}
                onContactLead={() => handleContactLead(selectedTask)}
                onScheduleContact={() => handleScheduleContact(selectedTask)}
                onComplete={() => handleCompleteTask(selectedTask.id)}
              />
            ) : (
              <TasksMetrics metrics={taskMetrics} />
            )}
          </div>
        </div>
      </Tabs>
      
      <TasksDialogs
        taskDialogOpen={taskDialogOpen}
        setTaskDialogOpen={setTaskDialogOpen}
        distributionDialogOpen={distributionDialogOpen}
        setDistributionDialogOpen={setDistributionDialogOpen}
        contactDialogOpen={contactDialogOpen}
        setContactDialogOpen={setContactDialogOpen}
        selectedTask={selectedTask}
        onSaveTask={handleCreateTask}
        onDistributeTasks={handleDistributeTasks}
        onContactSave={handleContactLead}
      />
    </div>
  );
};

export default TasksManagement;
