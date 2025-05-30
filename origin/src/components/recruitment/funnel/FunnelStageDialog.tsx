
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FunnelStage } from '@/types/recruitment';
import FunnelStageForm from './FunnelStageForm';
import { createEmptyStage, prepareStageForSubmit } from './utils/stageUtils';

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
  const [formState, setFormState] = React.useState<Partial<FunnelStage>>(createEmptyStage());
  
  // Atualiza o estado do formulário quando edita uma etapa existente
  React.useEffect(() => {
    if (stage) {
      setFormState({
        id: stage.id,
        name: stage.name,
        color: stage.color || 'bg-blue-500',
        icon: stage.icon,
        actions: [...(stage.actions || [''])],
        order: stage.order,
      });
    } else {
      setFormState(createEmptyStage());
    }
  }, [stage, open]);
  
  const handleSubmit = () => {
    // Verificação básica
    if (!formState.name || !formState.color) {
      alert('Nome e cor são obrigatórios');
      return;
    }
    
    const stageData = prepareStageForSubmit(formState);
    
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
        
        <FunnelStageForm 
          formState={formState}
          setFormState={setFormState}
        />
        
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
