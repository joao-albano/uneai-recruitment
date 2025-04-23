
import React from 'react';
import { Task } from '@/types/recruitment/tasks';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  MessageSquare, 
  Trash2,
  PencilLine,
  Calendar,
  CheckCircle,
  User,
  Clock,
  Bookmark,
  Building,
  MapPin
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator';

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
  onComplete
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'text-red-600';
      case 'média': return 'text-amber-600';
      case 'baixa': return 'text-green-600';
      default: return '';
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>
              {task.lead ? (
                <span>Lead: {task.lead.name}</span>
              ) : (
                'Tarefa sem lead associado'
              )}
            </CardDescription>
          </div>
          <Badge className="capitalize">
            {task.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {task.description && (
          <div>
            <h4 className="text-sm font-medium mb-1">Descrição</h4>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-1 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Criada em
            </h4>
            <p className="text-sm">
              {format(new Date(task.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Vencimento
            </h4>
            <p className="text-sm">
              {task.dueDate ? 
                format(new Date(task.dueDate), 'dd/MM/yyyy', { locale: ptBR }) : 
                'Sem prazo'
              }
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1 flex items-center">
              <User className="h-4 w-4 mr-1" />
              Responsável
            </h4>
            <p className="text-sm">
              {task.assignedToName || 'Não atribuído'}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1 flex items-center">
              <Bookmark className="h-4 w-4 mr-1" />
              Prioridade
            </h4>
            <p className={`text-sm font-medium ${getPriorityColor(task.priority)} capitalize`}>
              {task.priority}
            </p>
          </div>
        </div>
        
        {task.lead && (
          <>
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-3">Dados do Lead</h4>
              
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-start">
                  <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{task.lead.name}</p>
                    <p className="text-xs text-muted-foreground">{task.lead.email}</p>
                    <p className="text-xs text-muted-foreground">{task.lead.phone}</p>
                  </div>
                </div>
                
                {task.lead.course && (
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="text-sm">{task.lead.course}</p>
                  </div>
                )}
                
                {task.lead.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="text-sm">{task.lead.location}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        
        {task.contactAttempts && task.contactAttempts.length > 0 && (
          <>
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2">Histórico de Contatos</h4>
              
              <div className="space-y-2">
                {task.contactAttempts.slice(0, 3).map((contact, index) => (
                  <div key={index} className="text-sm bg-secondary/20 p-2 rounded">
                    <div className="flex justify-between">
                      <span className="font-medium capitalize">{contact.method}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(contact.timestamp), 'dd/MM - HH:mm', { locale: ptBR })}
                      </span>
                    </div>
                    <p className="text-xs mt-1">
                      Resultado: <span className="capitalize">{contact.result.replace('_', ' ')}</span>
                    </p>
                    {contact.notes && (
                      <p className="text-xs text-muted-foreground mt-1 italic">"{contact.notes}"</p>
                    )}
                  </div>
                ))}
                
                {task.contactAttempts.length > 3 && (
                  <p className="text-xs text-center text-muted-foreground">
                    +{task.contactAttempts.length - 3} outros contatos não exibidos
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex space-x-2 w-full">
          <Button className="flex-1" onClick={onContactLead}>
            <Phone className="h-4 w-4 mr-2" />
            Ligar
          </Button>
          <Button variant="secondary" className="flex-1" onClick={onContactLead}>
            <MessageSquare className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
        </div>
        
        <div className="flex space-x-2 w-full">
          <Button variant="outline" className="flex-1" onClick={onScheduleContact}>
            <Calendar className="h-4 w-4 mr-2" />
            Agendar
          </Button>
          <Button variant="outline" className="flex-1" onClick={onComplete}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Concluir
          </Button>
        </div>
        
        <div className="flex space-x-2 w-full">
          <Button variant="outline" onClick={onEdit} size="sm" className="flex-1">
            <PencilLine className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant="outline" onClick={onDelete} size="sm" className="flex-1 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskDetails;
