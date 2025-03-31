
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ChangeStageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: any;
  onSave: (leadId: number, newStage: string, notes: string) => void;
}

const ChangeStageDialog: React.FC<ChangeStageDialogProps> = ({ 
  open, 
  onOpenChange,
  lead,
  onSave
}) => {
  const [stage, setStage] = useState(lead?.stage || '');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    onSave(lead.id, stage, notes);
    toast({
      title: "Etapa atualizada",
      description: `O lead foi movido para a etapa: ${stage}`
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Alterar Etapa</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4" onClick={(e) => e.stopPropagation()}>
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-medium">Lead:</span>
              <span>{lead?.name}</span>
            </div>
            
            <Label htmlFor="stage">Nova Etapa</Label>
            <Select
              value={stage}
              onValueChange={setStage}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma etapa" />
              </SelectTrigger>
              <SelectContent onClick={(e) => e.stopPropagation()}>
                <SelectItem value="Contato Inicial">Contato Inicial</SelectItem>
                <SelectItem value="Agendamento">Agendamento</SelectItem>
                <SelectItem value="Visita">Visita</SelectItem>
                <SelectItem value="Matrícula">Matrícula</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Adicione informações sobre essa mudança de etapa"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={(e) => {
                e.stopPropagation();
                onOpenChange(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeStageDialog;
