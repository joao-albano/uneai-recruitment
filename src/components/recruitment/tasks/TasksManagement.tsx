
import React from 'react';
import { useTasksManagement } from './hooks/useTasksManagement';
import TasksHeader from './components/TasksHeader';
import TasksFilters from './components/TasksFilters';
import TasksList from './components/TasksList';
import TaskDetailsModal from './components/TaskDetailsModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TasksDialogs from './components/TasksDialogs';
import { LeadData } from '@/types/recruitment/leads';

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
  
  // Handlers para interação com leads
  const handleLeadContact = (lead: LeadData) => {
    if (selectedTask) {
      handleContactLead(selectedTask, 'telefone');
    }
  };

  const handleLeadSchedule = (lead: LeadData) => {
    if (selectedTask) {
      handleScheduleContact(selectedTask);
    }
  };

  // Handler seguro para fechar o modal
  const handleModalClose = (open: boolean) => {
    if (!open) {
      // Se estiver fechando o modal, defina selectedTask como null
      handleSelectTask(null);
    }
  };

  // Handler seguro para editar
  const handleTaskEdit = () => {
    if (selectedTask) {
      handleEditTask(selectedTask);
    }
  };
  
  // Handler seguro para excluir
  const handleTaskDelete = () => {
    if (selectedTask && selectedTask.id) {
      handleDeleteTask(selectedTask.id);
    }
  };
  
  // Handler seguro para completar
  const handleTaskComplete = () => {
    if (selectedTask && selectedTask.id) {
      handleCompleteTask(selectedTask.id);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
      <TasksHeader 
        onCreateTask={() => setTaskDialogOpen(true)} 
        onDistributeTasks={() => setDistributionDialogOpen(true)}
        metrics={taskMetrics}
      />
      
      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full sm:w-auto">
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
          
          <div className="mt-4">
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
        </Tabs>
      </div>
      
      {/* Use null-check para garantir que selectedTask realmente existe antes de passar props */}
      <TaskDetailsModal
        task={selectedTask}
        open={!!selectedTask}
        onOpenChange={handleModalClose}
        onEdit={handleTaskEdit}
        onDelete={handleTaskDelete}
        onContactLead={handleLeadContact}
        onScheduleContact={handleLeadSchedule}
        onComplete={handleTaskComplete}
      />
      
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
