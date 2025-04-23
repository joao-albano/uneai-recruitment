
import React from 'react';
import { Task } from '@/types/recruitment/tasks';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Check,
  Clock,
  Edit,
  Phone,
  Trash2,
  User,
} from 'lucide-react';

interface TaskDetailsProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onContactLead: () => void;
  onScheduleContact: () => void;
  onComplete: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  onEdit,
  onDelete,
  onContactLead,
  onScheduleContact,
  onComplete,
}) => {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'alta':
        return <Badge variant="destructive">Alta</Badge>;
      case 'média':
        return <Badge variant="default">Média</Badge>;
      case 'baixa':
        return <Badge variant="outline">Baixa</Badge>;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Pendente</Badge>;
      case 'em_andamento':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Em andamento</Badge>;
      case 'agendada':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Agendada</Badge>;
      case 'concluída':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Concluída</Badge>;
      case 'cancelada':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Cancelada</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>
              Criada em {format(new Date(task.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
            </CardDescription>
          </div>
          <div className="flex space-x-1">
            {getPriorityBadge(task.priority)}
            {getStatusBadge(task.status)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Descrição</h3>
          <p>{task.description || "Sem descrição"}</p>
        </div>
        
        <Separator />
        
        {task.lead && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Lead</h3>
            <div className="space-y-2">
              <p className="font-medium">{task.lead.name}</p>
              <div className="text-sm">
                <p>{task.lead.email}</p>
                <p>{task.lead.phone}</p>
                <p>Curso: {task.lead.course}</p>
                <p>Local: {task.lead.location}</p>
              </div>
            </div>
          </div>
        )}
        
        <Separator />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Data de Vencimento</h3>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              {task.dueDate ? (
                format(new Date(task.dueDate), 'dd/MM/yyyy', { locale: ptBR })
              ) : (
                "Não definida"
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Atribuída para</h3>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              {task.assignedToName || "Não atribuída"}
            </div>
          </div>
        </div>
        
        {task.contactAttempts && task.contactAttempts.length > 0 && (
          <>
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Histórico de Contatos</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {task.contactAttempts.map((attempt, index) => (
                  <div key={index} className="bg-muted p-2 rounded-md text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">{attempt.method}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(attempt.timestamp), 'dd/MM HH:mm', { locale: ptBR })}
                      </span>
                    </div>
                    <div>Resultado: {attempt.result}</div>
                    {attempt.notes && <div className="mt-1">{attempt.notes}</div>}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onContactLead}
          disabled={task.status === 'concluída' || task.status === 'cancelada'}
        >
          <Phone className="mr-2 h-4 w-4" />
          Contatar
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onScheduleContact}
          disabled={task.status === 'concluída' || task.status === 'cancelada'}
        >
          <Clock className="mr-2 h-4 w-4" />
          Agendar
        </Button>
        
        {task.status !== 'concluída' && (
          <Button 
            variant="default" 
            size="sm" 
            onClick={onComplete}
            disabled={task.status === 'cancelada'}
          >
            <Check className="mr-2 h-4 w-4" />
            Concluir
          </Button>
        )}
        
        <div className="grow" />
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onEdit}
        >
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </Button>
        
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={onDelete}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskDetails;
