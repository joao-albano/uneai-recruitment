
import React from 'react';
import { Button } from '@/components/ui/button';
import { TaskAgentMetrics } from '@/types/recruitment/tasks';
import { PlusCircle, Share2, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TasksHeaderProps {
  onCreateTask: () => void;
  onDistributeTasks: () => void;
  metrics: TaskAgentMetrics[];
}

const TasksHeader: React.FC<TasksHeaderProps> = ({
  onCreateTask,
  onDistributeTasks,
  metrics
}) => {
  // Calcular métricas agregadas a partir do array de metrics
  const totalCompleted = metrics.reduce((acc, agent) => acc + agent.tasksCompleted, 0);
  const totalPending = metrics.reduce((acc, agent) => acc + agent.tasksPending, 0);
  const totalTasks = totalCompleted + totalPending;
  const completionRate = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
  const averageConversionRate = metrics.length > 0
    ? metrics.reduce((acc, agent) => acc + agent.conversionRate, 0) / metrics.length
    : 0;
  const averageCompletionTime = metrics.length > 0
    ? metrics.reduce((acc, agent) => acc + agent.averageCompletionTime, 0) / metrics.length
    : 0;
  const topPerformer = metrics.length > 0
    ? metrics.reduce((best, current) => 
        current.conversionRate > best.conversionRate ? current : best, metrics[0])
    : null;
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gerenciamento de Tarefas</h1>
          <p className="text-muted-foreground">
            Gerencie tarefas de atendimento e conversão de leads
          </p>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={onDistributeTasks}>
            <Share2 className="mr-2 h-4 w-4" />
            Distribuir Tarefas
          </Button>
          
          <Button onClick={onCreateTask}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Tarefa
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Métricas de Tarefas
              <CheckCircle className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Taxa de Conclusão</span>
                <span className="font-bold">{completionRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Concluídas</span>
                <span className="font-bold">{totalCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pendentes</span>
                <span className="font-bold">{totalPending}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Desempenho
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Taxa de Conversão</span>
                <span className="font-bold">{(averageConversionRate * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tempo Médio</span>
                <span className="font-bold">{Math.round(averageCompletionTime)} min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Melhor Performance
              <Clock className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topPerformer ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nome</span>
                  <span className="font-bold">{topPerformer.agentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Conversão</span>
                  <span className="font-bold">{(topPerformer.conversionRate * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tarefas</span>
                  <span className="font-bold">{topPerformer.tasksCompleted}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center">Sem dados de performance</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TasksHeader;
