
import { useState, useCallback, useEffect } from 'react';
import { Task, TaskFilter, TaskContact, TaskAgentMetrics, ContactMethod } from '@/types/recruitment/tasks';
import { LeadData } from '@/types/recruitment/leads';
import { useTaskData } from './useTaskData';
import { useToast } from '@/components/ui/use-toast';

export const useTasksManagement = () => {
  const { toast } = useToast();
  
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
  
  // Estado local do hook
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFilter>({});
  const [activeTab, setActiveTab] = useState('all');
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
  const handleSelectTask = useCallback((task: Task | null) => {
    setSelectedTask(task);
    if (task) {
      setTaskDialogOpen(true);
    }
  }, []);
  
  // Criar nova tarefa
  const handleCreateTask = useCallback((taskData: Partial<Task>) => {
    const newTask = addTask(taskData);
    
    toast({
      title: "Tarefa criada",
      description: "A nova tarefa foi criada com sucesso.",
    });
    
    return newTask;
  }, [addTask, toast]);
  
  // Editar tarefa
  const handleEditTask = useCallback((task: Task) => {
    if (!task) return;
    
    if (task.id) {
      // Importante: preservar o status atual da tarefa se ela foi arrastada no Kanban
      updateTask(task);
      
      // Atualizar o selectedTask para refletir as mudanças
      setSelectedTask(task);
      
      toast({
        title: "Tarefa atualizada",
        description: "A tarefa foi atualizada com sucesso.",
      });
    } else {
      setSelectedTask(task);
      setTaskDialogOpen(true);
    }
  }, [updateTask, toast]);
  
  // Excluir tarefa
  const handleDeleteTask = useCallback((taskId: string) => {
    if (!taskId) return;
    
    deleteTask(taskId);
    setSelectedTask(null);
    
    toast({
      title: "Tarefa excluída",
      description: "A tarefa foi excluída com sucesso.",
    });
  }, [deleteTask, toast]);
  
  // Contatar lead
  const handleContactLead = useCallback((task: Task, method?: ContactMethod, result?: any) => {
    if (!task || !task.id) return;
    
    // Simular uma tentativa de contato
    const contactId = `contact-${Date.now()}`;
    const contactData: TaskContact = {
      id: contactId,
      taskId: task.id,
      method: method || 'telefone',
      timestamp: new Date(),
      result: result?.result || 'não_atendido',
      agentId: 'currentUser',
      notes: result?.notes || ''
    };
    
    registerContactAttempt(task.id, contactData);
    
    // Atualizar a tarefa selecionada para refletir a nova tentativa de contato
    if (selectedTask && selectedTask.id === task.id) {
      setSelectedTask(prev => {
        if (!prev) return null;
        const updatedContactAttempts = [...(prev.contactAttempts || []), contactData];
        return {
          ...prev,
          contactAttempts: updatedContactAttempts
        };
      });
    }
    
    toast({
      title: "Contato registrado",
      description: `Contato por ${method || 'telefone'} registrado com sucesso.`,
    });
  }, [registerContactAttempt, selectedTask, toast]);
  
  // Agendar contato
  const handleScheduleContact = useCallback((task: Task) => {
    if (!task || !task.id) return;
    
    const updatedTask = {
      ...task,
      status: 'agendada' as const
    };
    
    updateTask(updatedTask);
    
    // Atualizar a tarefa selecionada para refletir o novo status
    if (selectedTask && selectedTask.id === task.id) {
      setSelectedTask(updatedTask);
    }
    
    toast({
      title: "Contato agendado",
      description: "O contato foi agendado com sucesso.",
    });
  }, [updateTask, selectedTask, toast]);
  
  // Concluir tarefa
  const handleCompleteTask = useCallback((taskId: string) => {
    if (!taskId) return;
    
    completeTask(taskId);
    
    // Se a tarefa concluída for a selecionada, atualizar o selectedTask
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(prev => 
        prev ? { ...prev, status: 'concluída', completedAt: new Date() } : null
      );
    }
    
    toast({
      title: "Tarefa concluída",
      description: "A tarefa foi marcada como concluída.",
    });
  }, [completeTask, selectedTask, toast]);
  
  // Atribuir tarefa
  const handleAssignTask = useCallback((taskId: string, agentId: string = 'currentUser', agentName: string = 'Usuário Atual') => {
    if (!taskId) return;
    
    assignTask(taskId, agentId, agentName);
    
    toast({
      title: "Tarefa atribuída",
      description: `A tarefa foi atribuída para ${agentName}.`,
    });
  }, [assignTask, toast]);
  
  // Distribuir tarefas
  const handleDistributeTasks = useCallback((taskIds: string[], config: any) => {
    if (!taskIds || taskIds.length === 0) return;
    
    distributeTasksToAgents(taskIds, config);
    
    toast({
      title: "Tarefas distribuídas",
      description: "As tarefas foram distribuídas com sucesso.",
    });
  }, [distributeTasksToAgents, toast]);
  
  // Operações em massa
  const handleBulkOperations = useCallback((operation: string, selectedIds: string[]) => {
    if (!selectedIds || selectedIds.length === 0) return;
    
    switch (operation) {
      case 'delete':
        selectedIds.forEach(id => deleteTask(id));
        toast({
          title: "Tarefas excluídas",
          description: `${selectedIds.length} tarefa(s) foram excluídas.`,
        });
        break;
      case 'complete':
        selectedIds.forEach(id => completeTask(id));
        toast({
          title: "Tarefas concluídas",
          description: `${selectedIds.length} tarefa(s) foram concluídas.`,
        });
        break;
      default:
        break;
    }
  }, [deleteTask, completeTask, toast]);
  
  // Limpar filtros
  const clearFilters = useCallback(() => {
    setFilters({});
    applyFilters({});
  }, [applyFilters]);
  
  return {
    tasks,
    filteredTasks,
    selectedTask,
    filters,
    activeTab,
    taskDialogOpen,
    distributionDialogOpen,
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
    handleDistributeTasks,
    setTaskDialogOpen,
    setDistributionDialogOpen,
    setContactDialogOpen,
    handleBulkOperations,
    clearFilters
  };
};
