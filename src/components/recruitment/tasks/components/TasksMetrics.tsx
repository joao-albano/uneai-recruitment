
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TaskAgentMetrics } from '@/types/recruitment/tasks';

interface TasksMetricsProps {
  metrics: TaskAgentMetrics[];
  totalContactAttempts?: number;
}

const TasksMetrics: React.FC<TasksMetricsProps> = ({ metrics, totalContactAttempts = 0 }) => {
  // Calculate summary metrics
  const totalTasksCompleted = metrics.reduce((sum, agent) => sum + agent.tasksCompleted, 0);
  const totalTasksPending = metrics.reduce((sum, agent) => sum + agent.tasksPending, 0);
  const totalSuccessfulContacts = metrics.reduce((sum, agent) => sum + agent.successfulContacts, 0);
  const averageConversionRate = metrics.length > 0 
    ? metrics.reduce((sum, agent) => sum + agent.conversionRate, 0) / metrics.length
    : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard 
        title="Tarefas Pendentes" 
        value={totalTasksPending} 
        description="Total de tarefas aguardando ação"
      />
      <MetricCard 
        title="Tarefas Concluídas" 
        value={totalTasksCompleted}
        description="Total de tarefas finalizadas" 
      />
      <MetricCard 
        title="Tentativas de Contato" 
        value={totalContactAttempts}
        description="Total de tentativas realizadas"
      />
      <MetricCard 
        title="Taxa Conversão" 
        value={`${(averageConversionRate * 100).toFixed(1)}%`}
        description="Média de conversão por atendente" 
      />
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: number | string;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <span className="text-2xl font-bold mt-1">{value}</span>
          <span className="text-xs text-muted-foreground mt-1">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksMetrics;
