import { Task } from '@/types/recruitment/tasks';
import { ChannelType } from '@/types/recruitment/common';
import { LeadStatus } from '@/types/recruitment/leads'; // Import LeadStatus
import { v4 as uuidv4 } from 'uuid';

// Dados fictícios para simular leads
const demoLeads = [
  { 
    id: '1', 
    name: 'Maria Silva',
    email: 'maria.silva@example.com',
    phone: '(11) 98765-4321',
    course: 'Administração',
    location: 'São Paulo',
    channel: 'facebook' as ChannelType,
    confidenceLevel: 'alto',
    status: 'novo' as LeadStatus, // Cast to LeadStatus
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 dias atrás
    updatedAt: new Date()
  },
  { 
    id: '2', 
    name: 'João Santos',
    email: 'joao.santos@example.com',
    phone: '(11) 98765-4322',
    course: 'Direito',
    location: 'São Paulo',
    channel: 'instagram' as ChannelType,
    confidenceLevel: 'médio',
    status: 'contatado' as LeadStatus, // Cast to LeadStatus
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 dias atrás
    updatedAt: new Date()
  },
  { 
    id: '3', 
    name: 'Ana Oliveira',
    email: 'ana.oliveira@example.com',
    phone: '(21) 98765-4323',
    course: 'Medicina',
    location: 'Rio de Janeiro',
    channel: 'site' as ChannelType,
    confidenceLevel: 'alto',
    status: 'interessado' as LeadStatus,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 dias atrás
    updatedAt: new Date()
  },
  { 
    id: '4', 
    name: 'Carlos Souza',
    email: 'carlos.souza@example.com',
    phone: '(31) 98765-4324',
    course: 'Engenharia Civil',
    location: 'Belo Horizonte',
    channel: 'whatsapp' as ChannelType,
    confidenceLevel: 'baixo',
    status: 'nao_interessado' as LeadStatus,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 dias atrás
    updatedAt: new Date()
  },
  { 
    id: '5', 
    name: 'Fernanda Lima',
    email: 'fernanda.lima@example.com',
    phone: '(41) 98765-4325',
    course: 'Psicologia',
    location: 'Curitiba',
    channel: 'google' as ChannelType,
    confidenceLevel: 'médio',
    status: 'agendado' as LeadStatus,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 dias atrás
    updatedAt: new Date()
  },
  { 
    id: '6', 
    name: 'Ricardo Martins',
    email: 'ricardo.martins@example.com',
    phone: '(51) 98765-4326',
    course: 'Ciência da Computação',
    location: 'Porto Alegre',
    channel: 'facebook' as ChannelType,
    confidenceLevel: 'alto',
    status: 'contatado' as LeadStatus,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 dias atrás
    updatedAt: new Date()
  },
  { 
    id: '7', 
    name: 'Juliana Costa',
    email: 'juliana.costa@example.com',
    phone: '(81) 98765-4327',
    course: 'Marketing',
    location: 'Recife',
    channel: 'instagram' as ChannelType,
    confidenceLevel: 'médio',
    status: 'novo' as LeadStatus,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
    updatedAt: new Date()
  },
  { 
    id: '8', 
    name: 'Roberto Alves',
    email: 'roberto.alves@example.com',
    phone: '(85) 98765-4328',
    course: 'Nutrição',
    location: 'Fortaleza',
    channel: 'site' as ChannelType,
    confidenceLevel: 'baixo',
    status: 'interessado' as LeadStatus,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 dias atrás
    updatedAt: new Date()
  }
];

// Atendentes fictícios
const demoAgents = [
  { id: 'agent1', name: 'Ana Silva' },
  { id: 'agent2', name: 'Carlos Mendes' },
  { id: 'agent3', name: 'Paula Santos' }
];

// Títulos de tarefas fictícios
const taskTitles = [
  'Contato inicial',
  'Follow-up de interesse',
  'Esclarecer dúvidas sobre curso',
  'Confirmar presença em evento',
  'Agendar visita ao campus',
  'Verificar documentação',
  'Contato de retorno',
  'Apresentar bolsas disponíveis',
  'Lembrete de matrícula',
  'Confirmar informações'
];

// Prioridades
const priorities = ['alta', 'média', 'baixa'];

// Status
const statuses = ['pendente', 'em_andamento', 'concluída', 'agendada', 'cancelada'];

// Função para gerar uma data aleatória nos próximos dias
const randomFutureDate = (maxDays = 7) => {
  const today = new Date();
  const daysToAdd = Math.floor(Math.random() * maxDays) + 1;
  return new Date(today.setDate(today.getDate() + daysToAdd));
};

// Função para gerar uma data aleatória nos últimos dias
const randomPastDate = (maxDays = 14) => {
  const today = new Date();
  const daysToSubtract = Math.floor(Math.random() * maxDays) + 1;
  return new Date(today.setDate(today.getDate() - daysToSubtract));
};

// Função para gerar dados de tentativa de contato fictícios
const generateContactAttempts = (count: number, startDate: Date) => {
  const methods = ['telefone', 'whatsapp', 'email', 'presencial'];
  const results = ['atendido', 'não_atendido', 'caixa_postal', 'número_inválido', 'transferência', 'outro'];
  const attempts = [];
  
  for (let i = 0; i < count; i++) {
    const method = methods[Math.floor(Math.random() * methods.length)];
    const result = results[Math.floor(Math.random() * results.length)];
    const date = new Date(startDate.getTime() + (i * (1000 * 60 * 60 * 24)));
    
    attempts.push({
      id: uuidv4(),
      method,
      result,
      timestamp: date,
      notes: Math.random() > 0.5 ? `Tentativa de contato via ${method}` : undefined,
      duration: method === 'telefone' ? Math.floor(Math.random() * 300) : undefined,
      agentId: demoAgents[Math.floor(Math.random() * demoAgents.length)].id
    });
  }
  
  return attempts;
};

// Função principal para gerar tarefas fictícias
export const generateDemoTasks = (count: number): Task[] => {
  const tasks: Task[] = [];
  
  for (let i = 0; i < count; i++) {
    const leadIndex = Math.floor(Math.random() * demoLeads.length);
    const lead = demoLeads[leadIndex];
    
    const agentIndex = Math.random() > 0.2 ? Math.floor(Math.random() * demoAgents.length) : -1;
    const agent = agentIndex >= 0 ? demoAgents[agentIndex] : null;
    
    const titleIndex = Math.floor(Math.random() * taskTitles.length);
    const title = taskTitles[titleIndex];
    
    const priorityIndex = Math.floor(Math.random() * priorities.length);
    const priority = priorities[priorityIndex] as any;
    
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const status = statuses[statusIndex] as any;
    
    const createdAt = randomPastDate();
    const contactAttempts = Math.random() > 0.3 ? generateContactAttempts(Math.floor(Math.random() * 3) + 1, createdAt) : [];
    
    // Completar tarefas com base em tentativas de contato bem-sucedidas
    const hasSuccessfulContact = contactAttempts.some(a => a.result === 'atendido');
    const isCompleted = status === 'concluída' || (hasSuccessfulContact && Math.random() > 0.3);
    
    tasks.push({
      id: uuidv4(),
      leadId: lead.id,
      lead,
      title,
      description: `Tarefa para contato com ${lead.name} sobre interesse no curso de ${lead.course}`,
      createdAt,
      updatedAt: new Date(),
      dueDate: status !== 'concluída' ? randomFutureDate() : undefined,
      priority,
      status: isCompleted ? 'concluída' : status,
      assignedTo: agent ? agent.id : undefined,
      assignedToName: agent ? agent.name : undefined,
      contactAttempts,
      tags: [lead.course, lead.channel],
      source: Math.random() > 0.7 ? 'automático' : 'manual',
      completedAt: isCompleted ? new Date() : undefined,
      completedBy: isCompleted && agent ? agent.id : undefined
    });
  }
  
  return tasks;
};
