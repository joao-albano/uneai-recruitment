
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TaskAgentMetrics } from '@/types/recruitment/tasks';
import { ClipboardList, CheckCircle, PhoneCall, TrendingUp } from 'lucide-react';

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
        icon={<ClipboardList className="h-8 w-8 text-blue-500" />}
        trend="up"
      />
      <MetricCard 
        title="Tarefas Concluídas" 
        value={totalTasksCompleted}
        description="Total de tarefas finalizadas"
        icon={<CheckCircle className="h-8 w-8 text-green-500" />}
        trend="up"
      />
      <MetricCard 
        title="Tentativas de Contato" 
        value={totalContactAttempts}
        description="Total de tentativas realizadas"
        icon={<PhoneCall className="h-8 w-8 text-purple-500" />}
        trend="neutral"
      />
      <MetricCard 
        title="Taxa Conversão" 
        value={`${(averageConversionRate * 100).toFixed(1)}%`}
        description="Média de conversão por atendente"
        icon={<TrendingUp className="h-8 w-8 text-orange-500" />}
        trend="up"
      />
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, icon, trend }) => {
  return (
    <Card className="bg-white hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <div className="mt-1">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksMetrics;
