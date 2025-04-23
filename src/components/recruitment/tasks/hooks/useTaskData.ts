import { useState, useCallback } from 'react';
import { Task, TaskFilter, TaskAgentMetrics, TaskContact } from '@/types/recruitment/tasks';
import { ChannelType, LeadStatus } from '@/types/recruitment/common';

// This would normally come from an API
const mockTasks: Task[] = [
  {
    id: "task1",
    leadId: "lead1",
    lead: {
      id: "lead1",
      name: "João Silva",
      email: "joao@example.com",
      phone: "(11) 9 9999-9999",
      course: "Engenharia",
      location: "São Paulo",
      createdAt: new Date(),
      updatedAt: new Date(),
      channel: "site" as ChannelType,
      status: "novo" as LeadStatus
    },
    title: "Contatar sobre matrícula",
    description: "Verificar interesse na matrícula para o próximo semestre",
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Amanhã
    priority: "alta",
    status: "pendente",
    assignedTo: "user1",
    assignedToName: "Carlos Atendente",
    contactAttempts: [],
    tags: ["matrícula", "prioritário"],
    source: "manual"
  },
  {
    id: "task2",
    leadId: "lead2",
    lead: {
      id: "lead2",
      name: "Maria Oliveira",
      email: "maria@example.com",
      phone: "(11) 9 8888-8888",
      course: "Medicina",
      location: "Rio de Janeiro",
      createdAt: new Date(),
      updatedAt: new Date(),
      channel: "facebook" as ChannelType,
      status: "interessado" as LeadStatus
    },
    title: "Follow-up após visita",
    description: "Fazer follow-up após visita ao campus",
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000), // 2 dias
    priority: "média",
    status: "pendente",
    assignedTo: "user2",
    assignedToName: "Ana Atendente",
    contactAttempts: [],
    tags: ["follow-up", "visita"],
    source: "automático"
  }
];

// Simulação de métricas
const mockAgentMetrics: TaskAgentMetrics[] = [
  {
    agentId: "user1",
    agentName: "Carlos Atendente",
    tasksCompleted: 42,
    tasksPending: 5,
    averageCompletionTime: 35, // minutos
    conversionRate: 0.22, // 22%
    contactAttempts: 78,
    successfulContacts: 54
  },
  {
    agentId: "user2",
    agentName: "Ana Atendente",
    tasksCompleted: 38,
    tasksPending: 7,
    averageCompletionTime: 28, // minutos
    conversionRate: 0.18, // 18%
    contactAttempts: 72,
    successfulContacts: 45
  }
];

export const useTaskData = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(mockTasks);
  const [taskMetrics] = useState<TaskAgentMetrics[]>(mockAgentMetrics);

  // Adicionar nova tarefa
  const addTask = useCallback((taskData: Partial<Task>) => {
    const newTask: Task = {
      id: `task${Date.now()}`,
      leadId: taskData.leadId || "",
      lead: taskData.lead,
      title: taskData.title || "Nova tarefa",
      description: taskData.description || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: taskData.dueDate,
      priority: taskData.priority || "média",
      status: taskData.status || "pendente",
      assignedTo: taskData.assignedTo,
      assignedToName: taskData.assignedToName,
      contactAttempts: [],
      tags: taskData.tags || [],
      source: taskData.source || "manual"
    };
    
    setTasks(prev => [newTask, ...prev]);
    setFilteredTasks(prev => [newTask, ...prev]);
    
    return newTask;
  }, []);

  // Atualizar tarefa existente
  const updateTask = useCallback((updatedTask: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === updatedTask.id 
          ? { ...task, ...updatedTask, updatedAt: new Date() } 
          : task
      )
    );
    
    setFilteredTasks(prev => 
      prev.map(task => 
        task.id === updatedTask.id 
          ? { ...task, ...updatedTask, updatedAt: new Date() } 
          : task
      )
    );
  }, []);

  // Excluir tarefa
  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setFilteredTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  // Atribuir tarefa a um atendente
  const assignTask = useCallback((taskId: string, agentId: string, agentName: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              assignedTo: agentId, 
              assignedToName: agentName,
              updatedAt: new Date() 
            } 
          : task
      )
    );
    
    setFilteredTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              assignedTo: agentId, 
              assignedToName: agentName,
              updatedAt: new Date() 
            } 
          : task
      )
    );
  }, []);

  // Concluir uma tarefa
  const completeTask = useCallback((taskId: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: "concluída", 
              completedAt: new Date(),
              completedBy: "currentUser", // Na prática, pegar o usuário atual
              updatedAt: new Date() 
            } 
          : task
      )
    );
    
    setFilteredTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: "concluída", 
              completedAt: new Date(),
              completedBy: "currentUser", // Na prática, pegar o usuário atual
              updatedAt: new Date() 
            } 
          : task
      )
    );
  }, []);

  // Distribuir tarefas para atendentes
  const distributeTasksToAgents = useCallback((taskIds: string[], config: any) => {
    // Aqui seria implementada a lógica de distribuição
    // baseada na configuração. Para fins de demonstração,
    // vamos apenas simular a atribuição.
    
    const agents = ["user1", "user2", "user3"];
    const agentNames = ["Carlos Atendente", "Ana Atendente", "José Atendente"];
    
    setTasks(prev => 
      prev.map(task => {
        if (taskIds.includes(task.id)) {
          const randomIndex = Math.floor(Math.random() * agents.length);
          return {
            ...task,
            assignedTo: agents[randomIndex],
            assignedToName: agentNames[randomIndex],
            updatedAt: new Date()
          };
        }
        return task;
      })
    );
    
    setFilteredTasks(prev => 
      prev.map(task => {
        if (taskIds.includes(task.id)) {
          const randomIndex = Math.floor(Math.random() * agents.length);
          return {
            ...task,
            assignedTo: agents[randomIndex],
            assignedToName: agentNames[randomIndex],
            updatedAt: new Date()
          };
        }
        return task;
      })
    );
  }, []);

  // Registrar tentativa de contato
  const registerContactAttempt = useCallback((taskId: string, contactAttempt: TaskContact) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          const newContactAttempts = [...task.contactAttempts, contactAttempt];
          return {
            ...task,
            contactAttempts: newContactAttempts,
            updatedAt: new Date()
          };
        }
        return task;
      })
    );
    
    setFilteredTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          const newContactAttempts = [...task.contactAttempts, contactAttempt];
          return {
            ...task,
            contactAttempts: newContactAttempts,
            updatedAt: new Date()
          };
        }
        return task;
      })
    );
  }, []);

  // Aplicar filtros nas tarefas
  const applyFilters = useCallback((filters: TaskFilter) => {
    let result = [...tasks];
    
    // Filtro por termo de busca
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower) ||
        task.lead?.name.toLowerCase().includes(searchLower) ||
        task.lead?.email.toLowerCase().includes(searchLower)
      );
    }
    
    // Filtro por status
    if (filters.status && filters.status.length > 0) {
      result = result.filter(task => filters.status?.includes(task.status));
    }
    
    // Filtro por prioridade
    if (filters.priority && filters.priority.length > 0) {
      result = result.filter(task => filters.priority?.includes(task.priority));
    }
    
    // Filtro por atendente
    if (filters.assignedTo && filters.assignedTo.length > 0) {
      result = result.filter(task => 
        task.assignedTo && filters.assignedTo?.includes(task.assignedTo)
      );
    }
    
    // Filtro por data de vencimento
    if (filters.dueDate) {
      if (filters.dueDate.start) {
        result = result.filter(task => 
          task.dueDate && new Date(task.dueDate) >= new Date(filters.dueDate!.start)
        );
      }
      if (filters.dueDate.end) {
        result = result.filter(task => 
          task.dueDate && new Date(task.dueDate) <= new Date(filters.dueDate!.end)
        );
      }
    }
    
    setFilteredTasks(result);
  }, [tasks]);

  return {
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
  };
};
