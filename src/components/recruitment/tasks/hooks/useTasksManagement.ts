
import { useState, useEffect, useCallback } from 'react';
import { Task, TaskFilter, TaskAgentMetrics, TaskContact, ContactAttemptResult } from '@/types/recruitment/tasks';
import { useTaskData } from './useTaskData';

export const useTasksManagement = () => {
  // Estados
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filters, setFilters] = useState<TaskFilter>({});
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState<boolean>(false);
  const [distributionDialogOpen, setDistributionDialogOpen] = useState<boolean>(false);
  const [contactDialogOpen, setContactDialogOpen] = useState<boolean>(false);
  
  // Obter dados de tarefas
  const { 
    tasks, 
    filteredTasks, 
    taskMetrics,
    addTask,
    updateTask,
    deleteTask,
    assignTask,
    completeTask,
    distributeTasksToAgents,
    registerContactAttempt,
    applyFilters
  } = useTaskData();
  
  // Aplicar filtros quando eles mudarem
  useEffect(() => {
    applyFilters(filters);
  }, [filters, applyFilters]);
  
  // Handlers
  const handleSelectTask = useCallback((task: Task) => {
    setSelectedTask(task);
  }, []);
  
  const handleCreateTask = useCallback((task: Partial<Task>) => {
    addTask(task);
    setTaskDialogOpen(false);
  }, [addTask]);
  
  const handleEditTask = useCallback((task: Task) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
  }, []);
  
  const handleDeleteTask = useCallback((taskId: string) => {
    deleteTask(taskId);
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
  }, [deleteTask, selectedTask]);
  
  const handleContactLead = useCallback((task: Task, method: string = 'telefone', result?: ContactAttemptResult) => {
    setSelectedTask(task);
    if (!result) {
      setContactDialogOpen(true);
    } else {
      const contactAttempt: Partial<TaskContact> = {
        method: method as any,
        result,
        timestamp: new Date(),
        agentId: 'currentUser', // Substituir pelo ID do usuário atual em um ambiente real
      };
      
      registerContactAttempt(task.id, contactAttempt as TaskContact);
      setContactDialogOpen(false);
    }
  }, [registerContactAttempt]);
  
  const handleScheduleContact = useCallback((task: Task, scheduledDate?: Date) => {
    updateTask({
      ...task,
      status: 'agendada',
      dueDate: scheduledDate || new Date(Date.now() + 24 * 60 * 60 * 1000) // Padrão: amanhã
    });
  }, [updateTask]);
  
  const handleCompleteTask = useCallback((taskId: string) => {
    completeTask(taskId);
  }, [completeTask]);
  
  const handleAssignTask = useCallback((taskId: string, agentId: string, agentName: string) => {
    assignTask(taskId, agentId, agentName);
  }, [assignTask]);
  
  const handleDistributeTasks = useCallback((taskIds: string[], config: any) => {
    distributeTasksToAgents(taskIds, config);
    setDistributionDialogOpen(false);
  }, [distributeTasksToAgents]);
  
  const handleBulkOperations = useCallback((taskIds: string[], operation: string) => {
    switch (operation) {
      case 'delete':
        taskIds.forEach(id => deleteTask(id));
        break;
      case 'complete':
        taskIds.forEach(id => completeTask(id));
        break;
      case 'schedule':
        taskIds.forEach(id => {
          const task = tasks.find(t => t.id === id);
          if (task) {
            handleScheduleContact(task);
          }
        });
        break;
      default:
        break;
    }
  }, [deleteTask, completeTask, handleScheduleContact, tasks]);
  
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);
  
  return {
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
  };
};
