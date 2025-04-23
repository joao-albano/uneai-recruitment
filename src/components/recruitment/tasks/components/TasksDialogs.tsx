
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Task, TaskContact } from '@/types/recruitment/tasks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskForm from './TaskForm';
import TaskDistribution from './TaskDistribution';
import ContactForm from './ContactForm';
import LeadSelectionForm from './LeadSelectionForm';

interface TasksDialogsProps {
  taskDialogOpen: boolean;
  setTaskDialogOpen: (open: boolean) => void;
  distributionDialogOpen: boolean;
  setDistributionDialogOpen: (open: boolean) => void;
  contactDialogOpen: boolean;
  setContactDialogOpen: (open: boolean) => void;
  selectedTask: Task | null;
  onSaveTask: (task: Partial<Task>) => void;
  onDistributeTasks: (taskIds: string[], config: any) => void;
  onContactSave: (task: Task, method: string, result?: any) => void;
}

const TasksDialogs: React.FC<TasksDialogsProps> = ({
  taskDialogOpen,
  setTaskDialogOpen,
  distributionDialogOpen,
  setDistributionDialogOpen,
  contactDialogOpen,
  setContactDialogOpen,
  selectedTask,
  onSaveTask,
  onDistributeTasks,
  onContactSave
}) => {
  const [activeTab, setActiveTab] = useState('task-info');
  
  // Estado para o formulário de tarefa
  const [taskFormData, setTaskFormData] = useState<Partial<Task>>(
    selectedTask || {
      title: '',
      description: '',
      priority: 'média',
      status: 'pendente',
      selectedLeadIds: []
    }
  );
  
  // Estado para configuração de distribuição
  const [distributionConfig, setDistributionConfig] = useState({
    isAutomatic: true,
    maxTasksPerAgent: 20,
    prioritizeCriteria: 'priority' as 'priority' | 'dueDate' | 'region' | 'course',
    considerExpertise: true,
    balanceLoad: true
  });
  
  // Estado para formulário de contato
  const [contactFormData, setContactFormData] = useState<Partial<TaskContact>>({
    method: 'telefone',
    timestamp: new Date(),
    result: 'não_atendido',
    notes: '',
    agentId: 'currentUser'
  });
  
  // Resetar formulário de tarefa quando o diálogo abre/fecha
  React.useEffect(() => {
    if (taskDialogOpen) {
      setTaskFormData(selectedTask || {
        title: '',
        description: '',
        priority: 'média',
        status: 'pendente',
        selectedLeadIds: []
      });
      setActiveTab('task-info');
    }
  }, [taskDialogOpen, selectedTask]);
  
  const handleTaskSave = () => {
    onSaveTask(taskFormData);
    setTaskDialogOpen(false);
  };
  
  const handleDistributionSave = () => {
    // Simulando uma lista de IDs de tarefas
    const taskIds = ['task1', 'task2', 'task3'];
    onDistributeTasks(taskIds, distributionConfig);
    setDistributionDialogOpen(false);
  };
  
  const handleContactSave = () => {
    if (selectedTask) {
      onContactSave(
        selectedTask, 
        contactFormData.method || 'telefone',
        contactFormData.result
      );
    }
    setContactDialogOpen(false);
  };

  const handleLeadSelectionChange = (selectedLeadIds: string[]) => {
    setTaskFormData(prev => ({
      ...prev,
      selectedLeadIds
    }));
  };
  
  return (
    <>
      {/* Diálogo para criação/edição de tarefa */}
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedTask ? 'Editar Tarefa' : 'Nova Tarefa'}
            </DialogTitle>
            <DialogDescription>
              {selectedTask 
                ? "Edite os detalhes da tarefa e os leads associados." 
                : "Crie uma nova tarefa e selecione os leads que serão contatados."}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="task-info">Informações da Tarefa</TabsTrigger>
              <TabsTrigger value="lead-selection">Seleção de Leads</TabsTrigger>
            </TabsList>
            
            <TabsContent value="task-info" className="mt-4">
              <TaskForm 
                formData={taskFormData}
                onFormChange={setTaskFormData}
              />
            </TabsContent>
            
            <TabsContent value="lead-selection" className="mt-4">
              <LeadSelectionForm
                selectedLeadIds={taskFormData.selectedLeadIds || []}
                onSelectionChange={handleLeadSelectionChange}
              />
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setTaskDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleTaskSave} disabled={(taskFormData.selectedLeadIds || []).length === 0}>
              {selectedTask ? 'Salvar Alterações' : 'Criar Tarefa'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para distribuição de tarefas */}
      <Dialog open={distributionDialogOpen} onOpenChange={setDistributionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Distribuir Tarefas</DialogTitle>
            <DialogDescription>
              Configure como as tarefas serão distribuídas entre os atendentes.
            </DialogDescription>
          </DialogHeader>
          
          <TaskDistribution 
            config={distributionConfig}
            onConfigChange={setDistributionConfig}
            onConfirm={handleDistributionSave}
            onCancel={() => setDistributionDialogOpen(false)}
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDistributionDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleDistributionSave}>
              Distribuir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para registrar contato */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Registrar Contato</DialogTitle>
            <DialogDescription>
              Registre uma tentativa de contato com este lead.
            </DialogDescription>
          </DialogHeader>
          
          <ContactForm 
            formData={contactFormData}
            onFormChange={setContactFormData}
            leadName={selectedTask?.lead?.name}
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleContactSave}>
              Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TasksDialogs;
