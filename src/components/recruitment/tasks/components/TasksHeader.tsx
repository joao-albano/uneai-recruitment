
import React from 'react';
import { Button } from '@/components/ui/button';
import { TaskAgentMetrics } from '@/types/recruitment/tasks';
import { PlusCircle, Share2 } from 'lucide-react';

interface MetricsDisplayProps {
  label: string;
  value: number | string;
}

interface TasksHeaderProps {
  onCreateTask: () => void;
  onDistributeTasks: () => void;
  metrics: TaskAgentMetrics[];
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ label, value }) => {
  return (
    <div className="text-center px-2 md:px-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

const TasksHeader: React.FC<TasksHeaderProps> = ({
  onCreateTask,
  onDistributeTasks,
  metrics
}) => {
  // Calcular métricas agregadas a partir do array de metrics
  const totalCompleted = metrics.reduce((acc, agent) => acc + agent.tasksCompleted, 0);
  const totalPending = metrics.reduce((acc, agent) => acc + agent.tasksPending, 0);
  const totalTasks = totalCompleted + totalPending;
  const highPriorityTasks = Math.round(totalPending * 0.2); // 20% das pendentes como alta prioridade (simulação)
  const overdueTasks = Math.round(totalPending * 0.15); // 15% das pendentes como atrasadas (simulação)
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gerenciamento de Tarefas</h1>
          <p className="text-muted-foreground">
            Gerencie tarefas de atendimento e conversão de leads
          </p>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            onClick={onDistributeTasks}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Distribuir Tarefas
          </Button>
          
          <Button onClick={onCreateTask}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Tarefa
          </Button>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 border rounded-lg p-4 bg-card">
        <MetricsDisplay 
          label="Total de Tarefas" 
          value={totalTasks}
        />
        
        <MetricsDisplay 
          label="Concluídas" 
          value={totalCompleted}
        />
        
        <MetricsDisplay 
          label="Pendentes" 
          value={totalPending}
        />
        
        <MetricsDisplay 
          label="Alta Prioridade" 
          value={highPriorityTasks}
        />
        
        <MetricsDisplay 
          label="Atrasadas" 
          value={overdueTasks}
        />
      </div>
    </div>
  );
};

export default TasksHeader;
