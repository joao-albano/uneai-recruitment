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
    source: "manual",
    selectedLeadIds: ["lead1"]
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
    assignedToName: "Carlos Atendente",
    contactAttempts: [],
    tags: ["follow-up", "visita"],
    source: "automático",
    selectedLeadIds: ["lead2"]
  },
  {
    id: "task3",
    leadId: "lead3",
    lead: {
      id: "lead3",
      name: "Pedro Santos",
      email: "pedro@example.com",
      phone: "(11) 97777-7777",
      course: "Direito",
      location: "São Paulo",
      createdAt: new Date(),
      updatedAt: new Date(),
      channel: "instagram" as ChannelType,
      status: "quente" as LeadStatus
    },
    title: "Enviar material sobre curso",
    description: "Enviar material detalhado sobre o curso de Direito",
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(Date.now() + 72 * 60 * 60 * 1000),
    priority: "média",
    status: "pendente",
    assignedTo: "user1",
    assignedToName: "Carlos Atendente",
    contactAttempts: [],
    tags: ["material", "direito"],
    source: "manual",
    selectedLeadIds: ["lead3"]
  },
  {
    id: "task4",
    leadId: "lead4",
    lead: {
      id: "lead4",
      name: "Ana Silva",
      email: "ana@example.com",
      phone: "(11) 96666-6666",
      course: "Medicina",
      location: "Rio de Janeiro",
      createdAt: new Date(),
      updatedAt: new Date(),
      channel: "whatsapp" as ChannelType,
      status: "quente" as LeadStatus
    },
    title: "Agendar visita ao campus",
    description: "Marcar visita para conhecer as instalações da faculdade",
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(Date.now() + 96 * 60 * 60 * 1000),
    priority: "alta",
    status: "pendente",
    assignedTo: "user2",
    assignedToName: "Carlos Atendente",
    contactAttempts: [],
    tags: ["visita", "medicina"],
    source: "automático",
    selectedLeadIds: ["lead4"]
  },
  {
    id: "task5",
    leadId: "lead5",
    lead: {
      id: "lead5",
      name: "Mariana Costa",
      email: "mariana@example.com",
      phone: "(11) 95555-5555",
      course: "Engenharia",
      location: "São Paulo",
      createdAt: new Date(),
      updatedAt: new Date(),
      channel: "site" as ChannelType,
      status: "novo" as LeadStatus
    },
    title: "Follow-up pós evento",
    description: "Contato após participação na feira de profissões",
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(Date.now() + 120 * 60 * 60 * 1000),
    priority: "média",
    status: "pendente",
    assignedTo: "user2",
    assignedToName: "Carlos Atendente",
    contactAttempts: [],
    tags: ["evento", "follow-up"],
    source: "manual",
    selectedLeadIds: ["lead5"]
  }
];

// Mock leads para simulação
const mockLeads = [
  {
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
  {
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
  {
    id: "lead3",
    name: "Pedro Santos",
    email: "pedro@example.com",
    phone: "(11) 9 7777-7777",
    course: "Direito",
    location: "São Paulo",
    createdAt: new Date(),
    updatedAt: new Date(),
    channel: "instagram" as ChannelType,
    status: "quente" as LeadStatus
  },
  {
    id: "lead4",
    name: "Ana Silva",
    email: "ana@example.com",
    phone: "(11) 9 6666-6666",
    course: "Medicina",
    location: "Rio de Janeiro",
    createdAt: new Date(),
    updatedAt: new Date(),
    channel: "whatsapp" as ChannelType,
    status: "quente" as LeadStatus
  },
  {
    id: "lead5",
    name: "Mariana Costa",
    email: "mariana@example.com",
    phone: "(11) 9 5555-5555",
    course: "Engenharia",
    location: "São Paulo",
    createdAt: new Date(),
    updatedAt: new Date(),
    channel: "site" as ChannelType,
    status: "novo" as LeadStatus
  }
];

// Mock contact attempts history for visualization
const mockContactAttempts = [
  { leadId: "lead1", count: 35 },
  { leadId: "lead2", count: 42 },
  { leadId: "lead3", count: 23 },
  { leadId: "lead4", count: 45 },
  { leadId: "lead5", count: 30 },
  { leadId: "other", count: 50 } // For other leads not in the current mockLeads
];

// Simulação de métricas - Atualizado para refletir tarefas completadas
const mockAgentMetrics: TaskAgentMetrics[] = [
  {
    agentId: "user1",
    agentName: "Carlos Atendente",
    tasksCompleted: 1, // Marcamos uma tarefa como concluída
    tasksPending: 1,
    averageCompletionTime: 35,
    conversionRate: 0.20,
    contactAttempts: 78,
    successfulContacts: 54
  },
  {
    agentId: "user2",
    agentName: "Carlos Atendente",
    tasksCompleted: 0,
    tasksPending: 1,
    averageCompletionTime: 28,
    conversionRate: 0.20,
    contactAttempts: 72,
    successfulContacts: 45
  }
];

export const useTaskData = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(mockTasks);
  const [taskMetrics, setTaskMetrics] = useState<TaskAgentMetrics[]>(mockAgentMetrics);

  // Função para buscar lead por ID
  const findLeadById = useCallback((leadId: string) => {
    return mockLeads.find(lead => lead.id === leadId);
  }, []);

  // Adicionar nova tarefa
  const addTask = useCallback((taskData: Partial<Task>) => {
    // Garantir que temos um lead principal para compatibilidade
    const mainLeadId = taskData.selectedLeadIds && taskData.selectedLeadIds.length > 0 
      ? taskData.selectedLeadIds[0] 
      : "";
    
    const mainLead = findLeadById(mainLeadId);
    
    // Obter todos os leads selecionados
    const selectedLeads = (taskData.selectedLeadIds || [])
      .map(id => findLeadById(id))
      .filter(lead => lead !== undefined);
    
    const newTask: Task = {
      id: `task${Date.now()}`,
      leadId: mainLeadId, // Mantemos leadId para compatibilidade
      lead: mainLead, // Lead principal para compatibilidade
      leads: selectedLeads as any[], // Todos os leads selecionados
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
      source: taskData.source || "manual",
      selectedLeadIds: taskData.selectedLeadIds || []
    };
    
    setTasks(prev => [newTask, ...prev]);
    setFilteredTasks(prev => [newTask, ...prev]);
    
    // Atualizar métricas ao adicionar uma nova tarefa
    updateTaskMetrics();
    
    return newTask;
  }, [findLeadById]);

  // Atualizar tarefa existente
  const updateTask = useCallback((updatedTask: Partial<Task>) => {
    // Se houver alteração nos leads selecionados, atualizar os objetos lead
    let updatedTaskWithLeads = { ...updatedTask };
    
    if (updatedTask.selectedLeadIds) {
      const selectedLeads = updatedTask.selectedLeadIds
        .map(id => findLeadById(id))
        .filter(lead => lead !== undefined);
      
      updatedTaskWithLeads = {
        ...updatedTaskWithLeads,
        leads: selectedLeads as any[],
        // Se houver leads, definir o primeiro como o principal
        lead: selectedLeads.length > 0 ? selectedLeads[0] : undefined,
        leadId: selectedLeads.length > 0 ? selectedLeads[0]?.id : ""
      };
    }
    
    setTasks(prev => 
      prev.map(task => 
        task.id === updatedTask.id 
          ? { ...task, ...updatedTaskWithLeads, updatedAt: new Date() } 
          : task
      )
    );
    
    setFilteredTasks(prev => 
      prev.map(task => 
        task.id === updatedTask.id 
          ? { ...task, ...updatedTaskWithLeads, updatedAt: new Date() } 
          : task
      )
    );
    
    // Atualizar métricas quando uma tarefa for atualizada
    updateTaskMetrics();
  }, [findLeadById]);

  // Excluir tarefa
  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setFilteredTasks(prev => prev.filter(task => task.id !== taskId));
    
    // Atualizar métricas quando uma tarefa for excluída
    updateTaskMetrics();
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
    
    // Atualizar métricas quando uma tarefa for atribuída
    updateTaskMetrics();
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
    
    // Atualizar métricas quando uma tarefa for concluída
    updateTaskMetrics();
  }, []);

  // Atualizar métricas de tarefas
  const updateTaskMetrics = useCallback(() => {
    const updatedMetrics = [...taskMetrics];
    
    // Contar tarefas completadas e pendentes para cada agente
    tasks.forEach(task => {
      const agentIndex = updatedMetrics.findIndex(metric => metric.agentId === task.assignedTo);
      if (agentIndex !== -1) {
        // Resetamos primeiro
        updatedMetrics[agentIndex].tasksCompleted = 0;
        updatedMetrics[agentIndex].tasksPending = 0;
      }
    });
    
    // Agora contamos novamente baseado no estado atual
    tasks.forEach(task => {
      const agentIndex = updatedMetrics.findIndex(metric => metric.agentId === task.assignedTo);
      if (agentIndex !== -1) {
        if (task.status === "concluída") {
          updatedMetrics[agentIndex].tasksCompleted += 1;
        } else if (task.status === "pendente") {
          updatedMetrics[agentIndex].tasksPending += 1;
        }
      }
    });
    
    setTaskMetrics(updatedMetrics);
  }, [tasks, taskMetrics]);

  // Distribuir tarefas para atendentes
  const distributeTasksToAgents = useCallback((taskIds: string[], config: any) => {
    // Aqui seria implementada a lógica de distribuição
    // baseada na configuração. Para fins de demonstração,
    // vamos apenas simular a atribuição.
    
    const agents = ["user1", "user2", "user3"];
    const agentNames = ["Carlos Atendente", "Carlos Atendente", "José Atendente"];
    
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
    
    // Atualizar métricas após distribuição
    updateTaskMetrics();
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
    
    // Atualizar métricas para refletir a nova tentativa de contato
    const updatedMetrics = [...taskMetrics];
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
      const agentId = tasks[taskIndex].assignedTo;
      const agentIndex = updatedMetrics.findIndex(metric => metric.agentId === agentId);
      
      if (agentIndex !== -1) {
        updatedMetrics[agentIndex].contactAttempts += 1;
        if (contactAttempt.result === "atendido") {
          updatedMetrics[agentIndex].successfulContacts += 1;
        }
      }
    }
    
    setTaskMetrics(updatedMetrics);
  }, [tasks, taskMetrics]);

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

  // Executar updateTaskMetrics na montagem do componente
  useState(() => {
    updateTaskMetrics();
  });

  // Total de tentativas de contato (150) para exibir no dashboard
  const getTotalContactAttempts = useCallback(() => {
    return mockContactAttempts.reduce((sum, item) => sum + item.count, 0);
  }, []);

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
    applyFilters,
    getTotalContactAttempts
  };
};
