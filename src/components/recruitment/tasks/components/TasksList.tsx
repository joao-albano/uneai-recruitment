
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/recruitment/tasks';
import { Phone, MessageSquare, CheckCircle, Calendar, MoreHorizontal, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TasksListProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onContactLead: (task: Task, method: 'telefone' | 'whatsapp') => void;
  onScheduleContact: (task: Task) => void;
  onCompleteTask: (taskId: string) => void;
  onBulkOperations: (operation: string, selectedIds: string[]) => void;
}

const TasksList: React.FC<TasksListProps> = ({
  tasks,
  onSelectTask,
  onEditTask,
  onDeleteTask,
  onContactLead,
  onScheduleContact,
  onCompleteTask,
  onBulkOperations
}) => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  
  const handleSelectTask = (taskId: string, selected: boolean) => {
    setSelectedTasks(prev => 
      selected 
        ? [...prev, taskId] 
        : prev.filter(id => id !== taskId)
    );
  };
  
  const handleSelectAll = (selected: boolean) => {
    setSelectedTasks(selected ? tasks.map(task => task.id) : []);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge variant="outline">Pendente</Badge>;
      case 'em_andamento':
        return <Badge variant="secondary">Em Andamento</Badge>;
      case 'concluída':
        return <Badge variant="success">Concluída</Badge>;
      case 'agendada':
        return <Badge variant="info">Agendada</Badge>;
      case 'cancelada':
        return <Badge variant="destructive">Cancelada</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'alta':
        return <Badge variant="destructive">Alta</Badge>;
      case 'média':
        return <Badge variant="warning">Média</Badge>;
      case 'baixa':
        return <Badge variant="outline">Baixa</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <div>
      {selectedTasks.length > 0 && (
        <div className="flex gap-2 mb-4">
          <Button size="sm" variant="outline" onClick={() => onBulkOperations('complete', selectedTasks)}>
            <Check className="h-4 w-4 mr-2" />
            Concluir Selecionados
          </Button>
          <Button size="sm" variant="outline" onClick={() => onBulkOperations('delete', selectedTasks)}>
            Excluir Selecionados
          </Button>
        </div>
      )}
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]">
                <Checkbox 
                  checked={selectedTasks.length === tasks.length && tasks.length > 0}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                />
              </TableHead>
              <TableHead>Lead</TableHead>
              <TableHead>Tarefa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Atendente</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Nenhuma tarefa encontrada
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id} onClick={() => onSelectTask(task)} className="cursor-pointer">
                  <TableCell className="align-top" onClick={(e) => e.stopPropagation()}>
                    <Checkbox 
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={(checked) => handleSelectTask(task.id, !!checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{task.lead?.name || 'N/A'}</div>
                    <div className="text-sm text-muted-foreground">{task.lead?.phone || 'Sem telefone'}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {task.description || 'Sem descrição'}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>
                    {task.dueDate ? (
                      format(new Date(task.dueDate), 'dd/MM/yyyy', { locale: ptBR })
                    ) : (
                      'Sem prazo'
                    )}
                  </TableCell>
                  <TableCell>{task.assignedToName || 'Não atribuído'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          onContactLead(task, 'telefone'); 
                        }}
                        title="Ligar"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          onContactLead(task, 'whatsapp'); 
                        }}
                        title="Enviar WhatsApp"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          onScheduleContact(task); 
                        }}
                        title="Agendar"
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          onCompleteTask(task.id); 
                        }}
                        title="Concluir"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => { 
                            e.stopPropagation(); 
                            onEditTask(task); 
                          }}>
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => { 
                            e.stopPropagation(); 
                            onDeleteTask(task.id); 
                          }}>
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TasksList;
