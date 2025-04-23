
import { useState, useCallback, useMemo } from 'react';
import { Task, TaskFilter, TaskAgentMetrics, TaskContact } from '@/types/recruitment/tasks';
import { v4 as uuidv4 } from 'uuid';
import { generateDemoTasks } from '../data/demoTasksData';

export const useTaskData = () => {
  // Carregar tarefas de demonstração
  const [tasks, setTasks] = useState<Task[]>(() => generateDemoTasks(50));
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  
  // Adicionar nova tarefa
  const addTask = useCallback((task: Partial<Task>) => {
    const newTask: Task = {
      id: uuidv4(),
      leadId: task.leadId || '',
      lead: task.lead,
      title: task.title || 'Nova Tarefa',
      description: task.description || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: task.dueDate,
      priority: task.priority || 'média',
      status: task.status || 'pendente',
      assignedTo: task.assignedTo,
      assignedToName: task.assignedToName,
      contactAttempts: [],
      tags: task.tags || [],
      source: task.source || 'manual'
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    return newTask;
  }, []);
  
  // Atualizar tarefa existente
  const updateTask = useCallback((task: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(t => t.id === task.id 
        ? { ...task, updatedAt: new Date() } 
        : t
      )
    );
    return task;
  }, []);
  
  // Excluir tarefa
  const deleteTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
  }, []);
  
  // Atribuir tarefa a um atendente
  const assignTask = useCallback((taskId: string, agentId: string, agentName: string) => {
    setTasks(prevTasks => 
      prevTasks.map(t => t.id === taskId 
        ? { ...t, assignedTo: agentId, assignedToName: agentName, updatedAt: new Date() } 
        : t
      )
    );
  }, []);
  
  // Concluir tarefa
  const completeTask = useCallback((taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(t => t.id === taskId 
        ? { 
            ...t, 
            status: 'concluída', 
            completedAt: new Date(), 
            completedBy: 'currentUser', // Substituir pelo ID do usuário atual em um ambiente real
            updatedAt: new Date() 
          } 
        : t
      )
    );
  }, []);
  
  // Registrar tentativa de contato
  const registerContactAttempt = useCallback((taskId: string, contactAttempt: TaskContact) => {
    setTasks(prevTasks => 
      prevTasks.map(t => {
        if (t.id === taskId) {
          const newContactAttempts = [...t.contactAttempts, { ...contactAttempt, id: uuidv4() }];
          
          // Se for um contato bem-sucedido, marcar tarefa como concluída
          const isSuccessful = contactAttempt.result === 'atendido';
          
          return {
            ...t,
            contactAttempts: newContactAttempts,
            status: isSuccessful ? 'concluída' : t.status,
            completedAt: isSuccessful ? new Date() : t.completedAt,
            completedBy: isSuccessful ? 'currentUser' : t.completedBy, // Substituir pelo ID do usuário atual
            updatedAt: new Date()
          };
        }
        return t;
      })
    );
  }, []);
  
  // Distribuir tarefas para atendentes
  const distributeTasksToAgents = useCallback((taskIds: string[], config: any) => {
    // Simulação: distribuir tarefas entre 3 agentes
    const agents = [
      { id: 'agent1', name: 'Ana Silva' },
      { id: 'agent2', name: 'Carlos Mendes' },
      { id: 'agent3', name: 'Paula Santos' }
    ];
    
    setTasks(prevTasks => 
      prevTasks.map(t => {
        if (taskIds.includes(t.id)) {
          const randomAgentIndex = Math.floor(Math.random() * agents.length);
          const agent = agents[randomAgentIndex];
          
          return {
            ...t,
            assignedTo: agent.id,
            assignedToName: agent.name,
            updatedAt: new Date()
          };
        }
        return t;
      })
    );
  }, []);
  
  // Aplicar filtros
  const applyFilters = useCallback((filters: TaskFilter) => {
    setFilteredTasks(tasks.filter(task => {
      // Filtro de região
      if (filters.region && filters.region.length > 0) {
        if (!task.lead?.location) return false;
        if (!filters.region.some(r => task.lead?.location?.includes(r))) return false;
      }
      
      // Filtro de curso
      if (filters.course && filters.course.length > 0) {
        if (!task.lead?.course) return false;
        if (!filters.course.some(c => task.lead?.course === c)) return false;
      }
      
      // Filtro de tabulação (status do lead)
      if (filters.tabulation && filters.tabulation.length > 0) {
        if (!task.lead?.status) return false;
        if (!filters.tabulation.includes(task.lead.status)) return false;
      }
      
      // Filtro de fonte de captação
      if (filters.source && filters.source.length > 0) {
        if (!task.lead?.campaign && !task.lead?.channel) return false;
        const leadSource = task.lead.campaign || task.lead.channel;
        if (!filters.source.some(s => leadSource?.includes(s))) return false;
      }
      
      // Filtro de data de cadastro
      if (filters.registrationDateRange) {
        if (!task.lead?.createdAt) return false;
        const leadDate = new Date(task.lead.createdAt);
        if (
          leadDate < filters.registrationDateRange.start || 
          leadDate > filters.registrationDateRange.end
        ) return false;
      }
      
      // Filtro de nível de interesse
      if (filters.interestLevel && filters.interestLevel.length > 0) {
        // Simulação: usar confidenceLevel como nível de interesse
        if (!task.lead?.confidenceLevel) return false;
        if (!filters.interestLevel.includes(task.lead.confidenceLevel)) return false;
      }
      
      // Filtro por responsável
      if (filters.assignedTo && filters.assignedTo.length > 0) {
        if (!task.assignedTo) return false;
        if (!filters.assignedTo.includes(task.assignedTo)) return false;
      }
      
      // Filtro por status da tarefa
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(task.status)) return false;
      }
      
      // Filtro por prioridade
      if (filters.priority && filters.priority.length > 0) {
        if (!filters.priority.includes(task.priority)) return false;
      }
      
      // Filtro por data de vencimento
      if (filters.dueDate) {
        if (!task.dueDate) return false;
        if (
          task.dueDate < filters.dueDate.start || 
          task.dueDate > filters.dueDate.end
        ) return false;
      }
      
      // Filtro por termo de pesquisa
      if (filters.searchTerm && filters.searchTerm.trim() !== '') {
        const term = filters.searchTerm.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(term);
        const matchesDescription = task.description?.toLowerCase().includes(term);
        const matchesLeadName = task.lead?.name?.toLowerCase().includes(term);
        
        if (!matchesTitle && !matchesDescription && !matchesLeadName) return false;
      }
      
      return true;
    }));
  }, [tasks]);
  
  // Calcular métricas de tarefas
  const taskMetrics: TaskAgentMetrics[] = useMemo(() => {
    const agents: Record<string, TaskAgentMetrics> = {};
    
    // Calcular métricas para cada agente
    tasks.forEach(task => {
      const agentId = task.assignedTo || 'unassigned';
      const agentName = task.assignedToName || 'Não atribuído';
      
      if (!agents[agentId]) {
        agents[agentId] = {
          agentId,
          agentName,
          tasksCompleted: 0,
          tasksPending: 0,
          averageCompletionTime: 0,
          conversionRate: 0,
          contactAttempts: 0,
          successfulContacts: 0
        };
      }
      
      // Contar tarefas por status
      if (task.status === 'concluída') {
        agents[agentId].tasksCompleted++;
      } else {
        agents[agentId].tasksPending++;
      }
      
      // Contar tentativas de contato
      agents[agentId].contactAttempts += task.contactAttempts.length;
      
      // Contar contatos bem-sucedidos
      agents[agentId].successfulContacts += task.contactAttempts.filter(
        c => c.result === 'atendido'
      ).length;
    });
    
    // Calcular métricas adicionais
    Object.values(agents).forEach(agent => {
      // Calcular taxa de conversão (contatos bem-sucedidos / tentativas)
      agent.conversionRate = agent.contactAttempts > 0
        ? (agent.successfulContacts / agent.contactAttempts) * 100
        : 0;
        
      // Calcular tempo médio de conclusão (simulado com valor arbitrário)
      agent.averageCompletionTime = Math.floor(Math.random() * 30) + 10;
    });
    
    return Object.values(agents);
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
