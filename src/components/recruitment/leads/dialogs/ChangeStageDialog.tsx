
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

  // Reset form state when dialog opens with a new lead
  useEffect(() => {
    if (open && lead?.stage) {
      setStage(lead.stage);
      setNotes('');
      setIsSubmitting(false);
    }
  }, [lead, open]);

  // Stop propagation on all dialog clicks
  const handleDialogClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Handle form submission
  const handleSubmit = useCallback((e: React.MouseEvent) => {
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
    
    if (!lead?.id) return;
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Call save action with a copy of the data, not direct references
      onSave(Number(lead.id), String(stage), String(notes));
      
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
  }, [stage, notes, lead?.id, isSubmitting, onSave, onOpenChange, toast]);

  // Improved cancel handler with proper event prevention
  const handleCancel = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenChange(false);
  }, [onOpenChange]);

  if (!lead) return null;

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (isSubmitting) return;
        onOpenChange(isOpen);
      }}
    >
      <DialogContent 
        className="sm:max-w-[500px] z-50" 
        onClick={handleDialogClick}
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
              disabled={isSubmitting}
              required
            >
              <SelectTrigger id="stage" className="bg-white">
                <SelectValue placeholder="Selecione uma etapa" />
              </SelectTrigger>
              <SelectContent position="popper" className="bg-white">
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
              disabled={isSubmitting}
              rows={4}
              className="resize-none bg-white"
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
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
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
