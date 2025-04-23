
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Share2, BarChart2 } from 'lucide-react';
import { TaskAgentMetrics } from '@/types/recruitment/tasks';
import { Card, CardContent } from '@/components/ui/card';

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
  // Calcular totais
  const totalTasks = metrics.reduce((acc, agent) => acc + agent.tasksPending + agent.tasksCompleted, 0);
  const totalPending = metrics.reduce((acc, agent) => acc + agent.tasksPending, 0);
  const totalCompleted = metrics.reduce((acc, agent) => acc + agent.tasksCompleted, 0);
  const completionRate = totalTasks > 0 ? (totalCompleted / totalTasks) * 100 : 0;
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Tarefas</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie listas de tarefas baseadas em leads para otimizar conversões
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button onClick={onDistributeTasks} variant="outline">
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
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Tarefas</p>
                <p className="text-2xl font-bold">{totalTasks}</p>
              </div>
              <BarChart2 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tarefas Pendentes</p>
                <p className="text-2xl font-bold">{totalPending}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-amber-600 font-bold">{totalPending}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Conclusão</p>
                <p className="text-2xl font-bold">{completionRate.toFixed(1)}%</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">{totalCompleted}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TasksHeader;
