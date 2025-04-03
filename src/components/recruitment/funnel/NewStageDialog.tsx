
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface NewStageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (newStage: {
    name: string;
    description: string;
    expectedDuration: number;
  }) => void;
}

const NewStageDialog: React.FC<NewStageDialogProps> = ({
  open,
  onOpenChange,
  onSave
}) => {
  const { toast } = useToast();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [expectedDuration, setExpectedDuration] = React.useState(3);

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe um nome para a etapa",
        variant: "destructive"
      });
      return;
    }

    onSave({
      name,
      description,
      expectedDuration
    });

    // Reset form
    setName('');
    setDescription('');
    setExpectedDuration(3);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Nova Etapa do Funil</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da etapa</Label>
            <Input 
              id="name"
              placeholder="Ex: Agendamento de Visita"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o objetivo desta etapa"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duração esperada (dias)</Label>
            <Input
              id="duration"
              type="number"
              min={1}
              max={30}
              value={expectedDuration}
              onChange={(e) => setExpectedDuration(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Adicionar Etapa</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewStageDialog;
