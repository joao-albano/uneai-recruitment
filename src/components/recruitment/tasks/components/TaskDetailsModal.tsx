
import React from 'react';
import { Task } from '@/types/recruitment/tasks';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Phone, Edit, Trash2, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LeadList from './LeadList';

interface TaskDetailsModalProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
  onContactLead: () => void;
  onScheduleContact: () => void;
  onComplete: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  task,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  onContactLead,
  onScheduleContact,
  onComplete,
}) => {
  if (!task) return null;

  const priorityColor = {
    alta: 'bg-red-50 text-red-700 border-red-300',
    média: 'bg-yellow-50 text-yellow-700 border-yellow-300',
    baixa: 'bg-green-50 text-green-700 border-green-300'
  };

  const statusColor = {
    pendente: 'bg-blue-50 text-blue-700 border-blue-300',
    em_andamento: 'bg-purple-50 text-purple-700 border-purple-300',
    concluída: 'bg-green-50 text-green-700 border-green-300',
    agendada: 'bg-indigo-50 text-indigo-700 border-indigo-300',
    cancelada: 'bg-gray-50 text-gray-700 border-gray-300'
  };

  const hasLeads = task.leads && task.leads.length > 0;
  const leadsList = hasLeads ? task.leads : (task.lead ? [task.lead] : []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className={priorityColor[task.priority]}>
              Prioridade: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
            <Badge variant="outline" className={statusColor[task.status]}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </Badge>
          </div>
          <DialogTitle className="text-xl font-semibold">{task.title}</DialogTitle>
          <p className="text-muted-foreground">
            {task.assignedToName ? `Atribuído a: ${task.assignedToName}` : 'Não atribuído'}
          </p>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full mt-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="leads">Leads ({leadsList.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 mt-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Descrição</h4>
              <p className="text-sm text-muted-foreground">{task.description || 'Sem descrição'}</p>
            </div>
            
            {task.dueDate && (
              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Data de vencimento</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(task.dueDate), 'dd/MM/yyyy')}
                  </p>
                </div>
              </div>
            )}
            
            {task.tags && task.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-1">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {task.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium mb-1">Tentativas de Contato</h4>
              {task.contactAttempts.length > 0 ? (
                <div className="space-y-2">
                  {task.contactAttempts.map((attempt, index) => (
                    <div key={index} className="text-sm p-2 border rounded-md">
                      <p className="font-medium">
                        {format(new Date(attempt.timestamp), 'dd/MM/yyyy HH:mm')}
                      </p>
                      <p>Método: {attempt.method}</p>
                      <p>Resultado: {attempt.result}</p>
                      {attempt.notes && <p>Notas: {attempt.notes}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhuma tentativa de contato registrada</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="leads" className="mt-4">
            <LeadList leads={leadsList} />
          </TabsContent>
        </Tabs>

        <div className="flex flex-col gap-2 mt-6">
          {task.status !== 'concluída' && (
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={onContactLead}
              >
                <Phone className="h-4 w-4 mr-2" />
                Contatar
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={onScheduleContact}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Agendar
              </Button>
            </div>
          )}
          
          <div className="grid grid-cols-3 gap-2 w-full">
            {task.status !== 'concluída' && (
              <Button 
                variant="default" 
                className="w-full"
                onClick={onComplete}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Concluir
              </Button>
            )}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsModal;

