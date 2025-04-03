import React, { useState, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { FunnelStage } from '@/types/recruitment';

interface FunnelStageEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stage: FunnelStage | null;
  onSave: (updatedStage: FunnelStage) => void;
}

const FunnelStageEditDialog: React.FC<FunnelStageEditDialogProps> = ({
  open,
  onOpenChange,
  stage,
  onSave,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<FunnelStage>>({
    name: '',
    description: '',
    expectedDuration: 1,
  });

  // Update form data when stage changes
  useEffect(() => {
    if (stage) {
      setFormData({
        name: stage.name,
        description: stage.description,
        expectedDuration: stage.expectedDuration,
      });
    }
  }, [stage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stage) return;
    
    if (!formData.name?.trim()) {
      toast({
        title: "Erro de validação",
        description: "O nome da etapa é obrigatório",
        variant: "destructive",
      });
      return;
    }

    // Create updated stage by merging the original stage with form data
    const updatedStage: FunnelStage = {
      ...stage,
      name: formData.name,
      description: formData.description || '',
      expectedDuration: formData.expectedDuration || stage.expectedDuration,
    };

    onSave(updatedStage);
    onOpenChange(false);
    
    toast({
      title: "Etapa atualizada",
      description: "As alterações foram salvas com sucesso",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Etapa do Funil</DialogTitle>
            <DialogDescription>
              Atualize as informações desta etapa do processo de captação
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expectedDuration" className="text-right">
                Duração esperada (dias)
              </Label>
              <Input
                id="expectedDuration"
                type="number"
                min={1}
                value={formData.expectedDuration || 1}
                onChange={(e) => setFormData({ ...formData, expectedDuration: parseInt(e.target.value) || 1 })}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FunnelStageEditDialog;
