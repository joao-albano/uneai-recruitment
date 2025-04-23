
import { LeadData } from './leads';

export type TaskPriority = 'alta' | 'média' | 'baixa';

export type TaskStatus = 
  | 'pendente' 
  | 'em_andamento' 
  | 'concluída'
  | 'agendada' 
  | 'cancelada';

export type ContactAttemptResult = 
  | 'atendido' 
  | 'não_atendido' 
  | 'caixa_postal' 
  | 'número_inválido'
  | 'transferência'
  | 'outro';

export type ContactMethod = 
  | 'telefone' 
  | 'whatsapp' 
  | 'email' 
  | 'presencial';

export interface TaskContact {
  id: string;
  taskId: string;
  method: ContactMethod;
  timestamp: Date;
  result: ContactAttemptResult;
  notes?: string;
  duration?: number; // em segundos
  scheduledFollowUp?: Date;
  agentId: string;
}

export interface Task {
  id: string;
  leadId: string;
  lead?: LeadData;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo?: string; // ID do atendente
  assignedToName?: string; // Nome do atendente
  contactAttempts: TaskContact[];
  tags?: string[];
  source: 'manual' | 'automático';
  completedAt?: Date;
  completedBy?: string;
}

export interface TaskFilter {
  region?: string[];
  course?: string[];
  tabulation?: string[];
  source?: string[];
  registrationDateRange?: {
    start: Date;
    end: Date;
  };
  interestLevel?: string[];
  assignedTo?: string[];
  status?: TaskStatus[];
  priority?: TaskPriority[];
  dueDate?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}

export interface TaskAgentMetrics {
  agentId: string;
  agentName: string;
  tasksCompleted: number;
  tasksPending: number;
  averageCompletionTime: number; // em minutos
  conversionRate: number; // percentual
  contactAttempts: number;
  successfulContacts: number;
}

export interface TasksDistributionConfig {
  isAutomatic: boolean;
  maxTasksPerAgent: number;
  prioritizeCriteria: 'dueDate' | 'priority' | 'region' | 'course';
  considerExpertise: boolean;
  balanceLoad: boolean;
}
