
import { useState, useCallback } from 'react';
import { useTaskData } from './useTaskData';
import { Task, TaskFilter } from '@/types/recruitment/tasks';
import { LeadData } from '@/types/recruitment/leads';
import { useToast } from '@/components/ui/use-toast';

export const useTasksManagement = () => {
  // Estado local do hook
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFilter>({});
  const [activeTab, setActiveTab] = useState('all');
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [distributionDialogOpen, setDistributionDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  
  // Hook para toasts
  const { toast } = useToast();
  
  // Hook para operações de tarefas
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
  
  // Selecionar uma tarefa
  const handleSelectTask = useCallback((task: Task | null) => {
    setSelectedTask(task);
  }, []);
  
  // Limpar filtros
  const clearFilters = useCallback(() => {
    setFilters({});
    applyFilters({});
  }, [applyFilters]);
  
  // Criar nova tarefa ou atualizar existente
  const handleCreateTask = useCallback((taskData: Partial<Task>) => {
    // Verificar se é uma atualização ou criação
    if (taskData.id) {
      // Atualização
      updateTask(taskData);
      toast({
        title: "Tarefa atualizada",
        description: "A tarefa foi atualizada com sucesso.",
      });
    } else {
      // Criação
      const createdTask = addTask(taskData);
      toast({
        title: "Tarefa criada",
        description: "A nova tarefa foi criada com sucesso.",
      });
    }
  }, [addTask, updateTask, toast]);
  
  // Editar tarefa existente
  const handleEditTask = useCallback((task: Task) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
  }, []);
  
  // Excluir tarefa
  const handleDeleteTask = useCallback((taskId: string) => {
    deleteTask(taskId);
    setSelectedTask(null); // Limpar seleção
    toast({
      title: "Tarefa excluída",
      description: "A tarefa foi excluída com sucesso.",
    });
  }, [deleteTask, toast]);
  
  // Contatar lead
  const handleContactLead = useCallback((task: Task, method?: string, result?: any) => {
    if (!task.id) return;
    
    // Simular uma tentativa de contato
    const contactId = `contact-${Date.now()}`;
    const contactData = {
      id: contactId,
      taskId: task.id,
      method: method || 'telefone',
      timestamp: new Date(),
      result: result || 'não_atendido',
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
    // Aqui seria implementada a lógica para agendar um contato
    toast({
      title: "Contato agendado",
      description: "O contato foi agendado com sucesso.",
    });
  }, [toast]);
  
  // Concluir tarefa
  const handleCompleteTask = useCallback((taskId: string) => {
    completeTask(taskId);
    if (selectedTask?.id === taskId) {
      // Atualizar tarefa selecionada
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
  const handleAssignTask = useCallback((taskId: string, agentId: string, agentName: string) => {
    assignTask(taskId, agentId, agentName);
    toast({
      title: "Tarefa atribuída",
      description: `A tarefa foi atribuída para ${agentName}.`,
    });
  }, [assignTask, toast]);
  
  // Distribuir tarefas
  const handleDistributeTasks = useCallback((taskIds: string[], config: any) => {
    distributeTasksToAgents(taskIds, config);
    toast({
      title: "Tarefas distribuídas",
      description: "As tarefas foram distribuídas com sucesso.",
    });
  }, [distributeTasksToAgents, toast]);
  
  // Operações em massa
  const handleBulkOperations = useCallback((operation: string, selectedIds: string[]) => {
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
