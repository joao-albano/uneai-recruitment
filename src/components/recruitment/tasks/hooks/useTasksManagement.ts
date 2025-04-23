
import { useState, useCallback, useEffect } from 'react';
import { Task, TaskFilter, TaskContact, TaskAgentMetrics } from '@/types/recruitment/tasks';
import { useTaskData } from './useTaskData';

export const useTasksManagement = () => {
  const {
    tasks,
    filteredTasks,
    taskMetrics, // Este é um array de TaskAgentMetrics
    addTask,
    updateTask,
    deleteTask,
    assignTask,
    completeTask,
    distributeTasksToAgents,
    registerContactAttempt,
    applyFilters
  } = useTaskData();
  
  // Estado para a tarefa atualmente selecionada
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  // Estado para filtros ativos
  const [filters, setFilters] = useState<TaskFilter>({});
  
  // Estado para a aba ativa
  const [activeTab, setActiveTab] = useState('all');
  
  // Estados para diálogos
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [distributionDialogOpen, setDistributionDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  
  // Atualizar filtros quando mudar de aba
  useEffect(() => {
    let newFilters: TaskFilter = { ...filters };
    
    switch (activeTab) {
      case 'mine':
        newFilters = { ...newFilters, assignedTo: ['currentUser'] };
        break;
      case 'pending':
        newFilters = { ...newFilters, status: ['pendente'] };
        break;
      case 'scheduled':
        newFilters = { ...newFilters, status: ['agendada'] };
        break;
      case 'completed':
        newFilters = { ...newFilters, status: ['concluída'] };
        break;
      default:
        // Remover filtros de status e assignedTo se existirem
        const { status, assignedTo, ...rest } = newFilters;
        newFilters = rest;
    }
    
    applyFilters(newFilters);
    setFilters(newFilters);
  }, [activeTab]);
  
  // Selecionar uma tarefa
  const handleSelectTask = useCallback((task: Task) => {
    setSelectedTask(prevTask => 
      prevTask?.id === task.id ? null : task
    );
  }, []);
  
  // Criar nova tarefa
  const handleCreateTask = useCallback((taskData: Partial<Task>) => {
    const newTask = addTask(taskData);
    setSelectedTask(newTask);
  }, [addTask]);
  
  // Editar tarefa
  const handleEditTask = useCallback((task: Task) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
  }, []);
  
  // Excluir tarefa
  const handleDeleteTask = useCallback((taskId: string) => {
    deleteTask(taskId);
    setSelectedTask(null);
  }, [deleteTask]);
  
  // Contatar lead
  const handleContactLead = useCallback((task: Task, method?: string, result?: any) => {
    if (method) {
      // Registrar tentativa de contato
      const contactAttempt: Partial<TaskContact> = {
        method: method as any,
        result: result || 'não_atendido',
        timestamp: new Date(),
        agentId: 'currentUser',
        notes: ''
      };
      
      registerContactAttempt(task.id, contactAttempt as TaskContact);
      return;
    }
    
    // Abrir diálogo para registrar contato
    setSelectedTask(task);
    setContactDialogOpen(true);
  }, [registerContactAttempt]);
  
  // Agendar contato
  const handleScheduleContact = useCallback((task: Task) => {
    updateTask({
      ...task,
      status: 'agendada'
    });
  }, [updateTask]);
  
  // Atribuir tarefa
  const handleAssignTask = useCallback((taskId: string) => {
    assignTask(taskId, 'currentUser', 'Usuário Atual');
  }, [assignTask]);
  
  // Concluir tarefa
  const handleCompleteTask = useCallback((taskId: string) => {
    completeTask(taskId);
    // Se a tarefa concluída for a selecionada, atualizar o selectedTask
    setSelectedTask(prevTask => 
      prevTask?.id === taskId 
        ? { ...prevTask, status: 'concluída', completedAt: new Date() } 
        : prevTask
    );
  }, [completeTask]);
  
  // Distribuir tarefas
  const handleDistributeTasks = useCallback((taskIds: string[], config: any) => {
    distributeTasksToAgents(taskIds, config);
  }, [distributeTasksToAgents]);
  
  // Operações em massa
  const handleBulkOperations = useCallback((operation: string, taskIds: string[]) => {
    switch (operation) {
      case 'assign':
        taskIds.forEach(id => assignTask(id, 'currentUser', 'Usuário Atual'));
        break;
      case 'complete':
        taskIds.forEach(id => completeTask(id));
        break;
      case 'delete':
        taskIds.forEach(id => deleteTask(id));
        break;
      default:
        console.log(`Operação não reconhecida: ${operation}`);
    }
  }, [assignTask, completeTask, deleteTask]);
  
  // Limpar filtros
  const clearFilters = useCallback(() => {
    const baseFilters: TaskFilter = activeTab === 'all' ? {} : filters;
    setFilters(baseFilters);
    applyFilters(baseFilters);
  }, [activeTab, filters, applyFilters]);
  
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
    taskMetrics, // Este é um array de TaskAgentMetrics
    
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
