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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Métricas de Tarefas
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-blue-700 dark:text-blue-300">Taxa de Conclusão</span>
                <span className="font-bold text-blue-800 dark:text-blue-200">{completionRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700 dark:text-blue-300">Concluídas</span>
                <span className="font-bold text-blue-800 dark:text-blue-200">{totalCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700 dark:text-blue-300">Pendentes</span>
                <span className="font-bold text-blue-800 dark:text-blue-200">{totalPending}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Desempenho
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-purple-700 dark:text-purple-300">Taxa de Conversão</span>
                <span className="font-bold text-purple-800 dark:text-purple-200">{(averageConversionRate * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-purple-700 dark:text-purple-300">Tempo Médio</span>
                <span className="font-bold text-purple-800 dark:text-purple-200">{Math.round(averageCompletionTime)} min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Melhor Performance
              <Clock className="h-5 w-5 text-green-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topPerformer ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-green-700 dark:text-green-300">Nome</span>
                  <span className="font-bold text-green-800 dark:text-green-200">{topPerformer.agentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700 dark:text-green-300">Conversão</span>
                  <span className="font-bold text-green-800 dark:text-green-200">{(topPerformer.conversionRate * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700 dark:text-green-300">Tarefas</span>
                  <span className="font-bold text-green-800 dark:text-green-200">{topPerformer.tasksCompleted}</span>
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
