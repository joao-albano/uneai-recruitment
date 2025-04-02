
import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface EditLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: any;
  onSave: (updatedLead: any) => void;
}

const EditLeadDialog: React.FC<EditLeadDialogProps> = ({ 
  open, 
  onOpenChange,
  lead,
  onSave
}) => {
  const [editedLead, setEditedLead] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Update the form when the lead changes
  useEffect(() => {
    if (lead && open) {
      // Create a deep copy to prevent accidental mutations
      setEditedLead(JSON.parse(JSON.stringify(lead)));
      setIsSubmitting(false);
    }
  }, [lead, open]);

  // Handle dialog clicks to prevent bubbling
  const handleDialogClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedLead(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSelectChange = useCallback((name: string, value: string) => {
    setEditedLead(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!editedLead || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Create a deep copy for the save operation
      const leadToSave = JSON.parse(JSON.stringify(editedLead));
      onSave(leadToSave);
      
      toast({
        title: "Lead atualizado",
        description: "As informações foram atualizadas com sucesso"
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível salvar as alterações. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [editedLead, isSubmitting, onSave, toast, onOpenChange]);

  // Prevent issues with null lead
  if (!lead && open) {
    onOpenChange(false);
    return null;
  }

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
          <DialogTitle>Editar Lead</DialogTitle>
          <DialogDescription>Edite as informações do lead abaixo.</DialogDescription>
        </DialogHeader>

        {lead && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={editedLead.name || ''}
                  onChange={handleInputChange}
                  className="bg-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="children">Número de Filhos</Label>
                <Input
                  id="children"
                  name="children"
                  type="number"
                  value={editedLead.children || 0}
                  onChange={handleInputChange}
                  className="bg-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="course">Curso de Interesse</Label>
                <Select
                  value={editedLead.course || ''}
                  onValueChange={(value) => handleSelectChange('course', value)}
                >
                  <SelectTrigger id="course" className="bg-white">
                    <SelectValue placeholder="Selecione um curso" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-white">
                    <SelectItem value="Ensino Fundamental">Ensino Fundamental</SelectItem>
                    <SelectItem value="Ensino Médio">Ensino Médio</SelectItem>
                    <SelectItem value="Educação Infantil">Educação Infantil</SelectItem>
                    <SelectItem value="Graduação">Graduação</SelectItem>
                    <SelectItem value="Pós-Graduação">Pós-Graduação</SelectItem>
                    <SelectItem value="MBA">MBA</SelectItem>
                    <SelectItem value="Mestrado">Mestrado</SelectItem>
                    <SelectItem value="Doutorado">Doutorado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="channel">Canal</Label>
                <Select
                  value={editedLead.channel || ''}
                  onValueChange={(value) => handleSelectChange('channel', value)}
                >
                  <SelectTrigger id="channel" className="bg-white">
                    <SelectValue placeholder="Selecione um canal" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-white">
                    <SelectItem value="Site">Site</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Indicação">Indicação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
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
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditLeadDialog;
