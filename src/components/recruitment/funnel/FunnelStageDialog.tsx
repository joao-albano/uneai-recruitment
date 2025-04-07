
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import { FunnelStage } from '@/types/recruitment';

interface FunnelStageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stage?: FunnelStage | null;
  funnelId?: string | null;
  parentStageId?: string | null;
  stages?: FunnelStage[];
  onSave?: (stage: FunnelStage) => void;
  onAddStage?: (newStage: FunnelStage) => void;
}

const FunnelStageDialog: React.FC<FunnelStageDialogProps> = ({
  open,
  onOpenChange,
  stage = null,
  funnelId = null,
  parentStageId = null,
  stages = [],
  onSave,
  onAddStage
}) => {
  // Estado inicial do formulário
  const [formState, setFormState] = React.useState<Partial<FunnelStage>>({
    name: '',
    color: 'bg-blue-500',
    actions: [''],
  });
  
  // Atualiza o estado do formulário quando edita uma etapa existente
  React.useEffect(() => {
    if (stage) {
      setFormState({
        id: stage.id,
        name: stage.name,
        color: stage.color,
        icon: stage.icon,
        actions: [...stage.actions],
        order: stage.order,
      });
    } else {
      setFormState({
        name: '',
        color: 'bg-blue-500',
        actions: [''],
        order: 0,
      });
    }
  }, [stage, open]);
  
  // Manipuladores de formulário
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, name: e.target.value });
  };
  
  const handleColorChange = (value: string) => {
    setFormState({ ...formState, color: value });
  };
  
  const handleActionChange = (index: number, value: string) => {
    const updatedActions = [...(formState.actions || [])];
    updatedActions[index] = value;
    setFormState({ ...formState, actions: updatedActions });
  };
  
  const handleAddAction = () => {
    setFormState({ 
      ...formState, 
      actions: [...(formState.actions || []), ''] 
    });
  };
  
  const handleRemoveAction = (index: number) => {
    const updatedActions = [...(formState.actions || [])];
    updatedActions.splice(index, 1);
    setFormState({ ...formState, actions: updatedActions });
  };
  
  const handleSubmit = () => {
    // Verificação básica
    if (!formState.name || !formState.color) {
      alert('Nome e cor são obrigatórios');
      return;
    }
    
    // Filtrar ações vazias
    const filteredActions = (formState.actions || []).filter(a => a.trim() !== '');
    
    // Preparar objeto para salvar
    const stageData: FunnelStage = {
      id: formState.id || `${Date.now()}`,
      name: formState.name,
      color: formState.color,
      icon: formState.icon || null,
      actions: filteredActions,
      order: formState.order || 0,
      isActive: true,
      leadCount: 0,
      expectedDuration: 1,
    };
    
    if (onSave) {
      onSave(stageData);
    }
    
    if (onAddStage) {
      onAddStage(stageData);
    }
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{stage ? 'Editar' : 'Criar'} Etapa do Funil</DialogTitle>
          <DialogDescription>
            {stage 
              ? 'Atualize as informações da etapa do funil de captação'
              : 'Configure uma nova etapa para o funil de captação'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Etapa</Label>
            <Input 
              id="name" 
              placeholder="Ex: Contato Inicial, Agendamento, etc."
              value={formState.name}
              onChange={handleNameChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="color">Cor da Etapa</Label>
            <Select 
              value={formState.color} 
              onValueChange={handleColorChange}
            >
              <SelectTrigger id="color">
                <SelectValue placeholder="Selecione uma cor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bg-blue-500">Azul</SelectItem>
                <SelectItem value="bg-green-500">Verde</SelectItem>
                <SelectItem value="bg-red-500">Vermelho</SelectItem>
                <SelectItem value="bg-yellow-500">Amarelo</SelectItem>
                <SelectItem value="bg-purple-500">Roxo</SelectItem>
                <SelectItem value="bg-amber-500">Âmbar</SelectItem>
                <SelectItem value="bg-pink-500">Rosa</SelectItem>
                <SelectItem value="bg-indigo-500">Índigo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Ações nesta Etapa</Label>
            <div className="space-y-3">
              {formState.actions?.map((action, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input 
                    placeholder="Ex: Telefonema, E-mail, Visita, etc."
                    value={action}
                    onChange={(e) => handleActionChange(index, e.target.value)}
                  />
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveAction(index)}
                    disabled={formState.actions?.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={handleAddAction}
              >
                <Plus className="h-4 w-4" />
                <span>Adicionar Ação</span>
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button type="button" onClick={handleSubmit}>
            {stage ? 'Atualizar' : 'Criar'} Etapa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FunnelStageDialog;
