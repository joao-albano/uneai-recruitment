
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskAgentMetrics } from '@/types/recruitment/tasks';
import { CheckCheck, Clock, BarChart, Phone } from 'lucide-react';

interface TasksMetricsProps {
  metrics: TaskAgentMetrics[];
}

const TasksMetrics: React.FC<TasksMetricsProps> = ({ metrics }) => {
  // Calcular métricas agregadas
  const totalTasksCompleted = metrics.reduce((sum, agent) => sum + agent.tasksCompleted, 0);
  const totalTasksPending = metrics.reduce((sum, agent) => sum + agent.tasksPending, 0);
  const avgCompletionTime = metrics.reduce((sum, agent) => sum + agent.averageCompletionTime, 0) / metrics.length;
  const totalContactAttempts = metrics.reduce((sum, agent) => sum + agent.contactAttempts, 0);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tarefas Concluídas</CardTitle>
          <CheckCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTasksCompleted}</div>
          <p className="text-xs text-muted-foreground">
            {totalTasksPending} pendentes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgCompletionTime.toFixed(0)} min</div>
          <p className="text-xs text-muted-foreground">
            por tarefa concluída
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(metrics.reduce((sum, agent) => sum + agent.conversionRate, 0) / metrics.length * 100).toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            média entre atendentes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contatos Realizados</CardTitle>
          <Phone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalContactAttempts}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.reduce((sum, agent) => sum + agent.successfulContacts, 0)} bem-sucedidos
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksMetrics;
