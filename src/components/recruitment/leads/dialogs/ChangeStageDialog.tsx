
import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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
  const [stage, setStage] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Atualizar o estado quando o lead mudar ou o diálogo abrir
  useEffect(() => {
    if (open && lead?.stage) {
      setStage(lead.stage);
      setNotes(''); // Limpar notas ao abrir diálogo para novo lead
    }
  }, [lead, open]);

  // Impedir propagação de eventos dentro do diálogo
  const handleDialogClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Cancelar e fechar o diálogo
  const handleCancel = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenChange(false);
  }, [onOpenChange]);

  // Processar o envio do formulário
  const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!stage) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, selecione uma etapa",
        variant: "destructive",
      });
      return;
    }
    
    if (lead?.id) {
      setIsSubmitting(true);
      
      try {
        onSave(lead.id, stage, notes);
        toast({
          title: "Etapa atualizada",
          description: `O lead foi movido para a etapa: ${stage}`
        });
        onOpenChange(false);
      } catch (error) {
        console.error("Erro ao atualizar etapa:", error);
        toast({
          title: "Erro ao atualizar",
          description: "Não foi possível atualizar a etapa. Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [lead, stage, notes, onSave, toast, onOpenChange]);

  return (
    <Dialog 
      open={open} 
      onOpenChange={onOpenChange}
    >
      <DialogContent 
        className="sm:max-w-[500px]" 
        onClick={handleDialogClick}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Alterar Etapa</DialogTitle>
          <DialogDescription>Altere a etapa do funil para este lead.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
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
              <SelectTrigger id="stage">
                <SelectValue placeholder="Selecione uma etapa" />
              </SelectTrigger>
              <SelectContent>
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
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeStageDialog;
