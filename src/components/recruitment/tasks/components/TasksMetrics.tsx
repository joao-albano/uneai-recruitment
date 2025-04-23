
import React from 'react';
import { TaskAgentMetrics } from '@/types/recruitment/tasks';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

interface TasksMetricsProps {
  metrics: TaskAgentMetrics[];
}

const TasksMetrics: React.FC<TasksMetricsProps> = ({ metrics }) => {
  const totalTasks = metrics.reduce((acc, agent) => 
    acc + agent.tasksCompleted + agent.tasksPending, 0);
  
  const totalCompleted = metrics.reduce((acc, agent) => 
    acc + agent.tasksCompleted, 0);
  
  const totalPending = metrics.reduce((acc, agent) => 
    acc + agent.tasksPending, 0);
  
  const averageCompletionTime = metrics.length > 0
    ? metrics.reduce((acc, agent) => 
        acc + agent.averageCompletionTime, 0) / metrics.length
    : 0;
  
  const averageConversionRate = metrics.length > 0
    ? metrics.reduce((acc, agent) => 
        acc + agent.conversionRate, 0) / metrics.length
    : 0;
  
  const topPerformer = metrics.length > 0
    ? metrics.reduce((best, current) => 
        current.conversionRate > best.conversionRate ? current : best, metrics[0])
    : null;
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Métricas de Tarefas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Taxa de Conclusão
                </p>
                <div className="text-2xl font-bold">
                  {totalTasks > 0 
                    ? Math.round((totalCompleted / totalTasks) * 100) 
                    : 0}%
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            
            <Progress 
              value={totalTasks > 0 ? (totalCompleted / totalTasks) * 100 : 0} 
              className="h-2"
            />
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Concluídas</span>
                <span className="text-xl font-bold">{totalCompleted}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Pendentes</span>
                <span className="text-xl font-bold">{totalPending}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Desempenho</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
              <p className="text-xl font-bold">{averageConversionRate.toFixed(1)}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-muted-foreground" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tempo Médio de Conclusão</p>
              <p className="text-xl font-bold">{Math.round(averageCompletionTime)} min</p>
            </div>
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
          
          {topPerformer && (
            <div className="border-t pt-3 mt-3">
              <p className="text-sm text-muted-foreground">Melhor Performance</p>
              <div className="flex items-center mt-1">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{topPerformer.agentName}</p>
                  <p className="text-sm text-muted-foreground">
                    {topPerformer.conversionRate.toFixed(1)}% conversão · {topPerformer.tasksCompleted} tarefas
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksMetrics;
