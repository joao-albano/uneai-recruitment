
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/types/recruitment/tasks';

interface TasksDialogsProps {
  taskDialogOpen: boolean;
  setTaskDialogOpen: (open: boolean) => void;
  contactDialogOpen: boolean;
  setContactDialogOpen: (open: boolean) => void;
  selectedTask: Task | null;
  onCreateTask: (taskData: Partial<Task>) => void;
  onEditTask: (task: Task) => void;
  onContactLead: (task: Task, method: 'telefone' | 'whatsapp', data: any) => void;
  onAssignTask: (taskId: string, agentId: string, agentName: string) => void;
}

const TasksDialogs: React.FC<TasksDialogsProps> = ({
  taskDialogOpen,
  setTaskDialogOpen,
  contactDialogOpen,
  setContactDialogOpen,
  selectedTask,
  onCreateTask,
  onEditTask,
  onContactLead,
  onAssignTask
}) => {
  const [taskData, setTaskData] = React.useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'média',
    status: 'pendente',
    dueDate: undefined,
  });
  
  const [contactData, setContactData] = React.useState({
    method: 'telefone' as 'telefone' | 'whatsapp',
    notes: '',
  });
  
  React.useEffect(() => {
    if (selectedTask && taskDialogOpen) {
      setTaskData({
        ...selectedTask,
      });
    } else if (!taskDialogOpen) {
      // Reset form when dialog closes
      setTaskData({
        title: '',
        description: '',
        priority: 'média',
        status: 'pendente',
        dueDate: undefined,
      });
    }
  }, [selectedTask, taskDialogOpen]);
  
  const handleSubmitTask = () => {
    if (selectedTask) {
      onEditTask({
        ...selectedTask,
        ...taskData,
      } as Task);
    } else {
      onCreateTask(taskData);
    }
    setTaskDialogOpen(false);
  };
  
  const handleSubmitContact = () => {
    if (selectedTask) {
      onContactLead(selectedTask, contactData.method, {
        notes: contactData.notes
      });
      setContactDialogOpen(false);
    }
  };
  
  const isEditMode = !!selectedTask;
  
  return (
    <>
      {/* Task Dialog */}
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Editar Tarefa' : 'Nova Tarefa'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={taskData.title || ''}
                onChange={(e) => setTaskData({...taskData, title: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={taskData.description || ''}
                onChange={(e) => setTaskData({...taskData, description: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select 
                  value={taskData.priority || 'média'} 
                  onValueChange={(value: any) => setTaskData({...taskData, priority: value})}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="média">Média</SelectItem>
                    <SelectItem value="baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={taskData.status || 'pendente'} 
                  onValueChange={(value: any) => setTaskData({...taskData, status: value})}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="em_andamento">Em andamento</SelectItem>
                    <SelectItem value="agendada">Agendada</SelectItem>
                    <SelectItem value="concluída">Concluída</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Data de vencimento</Label>
              <Input
                id="dueDate"
                type="date"
                value={taskData.dueDate ? new Date(taskData.dueDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setTaskData({
                  ...taskData, 
                  dueDate: e.target.value ? new Date(e.target.value) : undefined
                })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setTaskDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmitTask}>
              {isEditMode ? 'Atualizar' : 'Criar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Registrar Contato</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="method">Método de Contato</Label>
              <Select 
                value={contactData.method} 
                onValueChange={(value: any) => setContactData({...contactData, method: value})}
              >
                <SelectTrigger id="method">
                  <SelectValue placeholder="Método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="telefone">Telefone</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="presencial">Presencial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                value={contactData.notes}
                onChange={(e) => setContactData({...contactData, notes: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmitContact}>
              Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TasksDialogs;
