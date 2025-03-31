
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  const [editedLead, setEditedLead] = useState(lead);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedLead(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedLead(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedLead);
    toast({
      title: "Lead atualizado",
      description: "As informações do lead foram atualizadas com sucesso!"
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Lead</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={editedLead.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="children">Número de Filhos</Label>
              <Input
                id="children"
                name="children"
                type="number"
                value={editedLead.children}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="course">Curso de Interesse</Label>
              <Select
                value={editedLead.course}
                onValueChange={(value) => handleSelectChange('course', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um curso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ensino Fundamental">Ensino Fundamental</SelectItem>
                  <SelectItem value="Ensino Médio">Ensino Médio</SelectItem>
                  <SelectItem value="Educação Infantil">Educação Infantil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="channel">Canal</Label>
              <Select
                value={editedLead.channel}
                onValueChange={(value) => handleSelectChange('channel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um canal" />
                </SelectTrigger>
                <SelectContent>
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
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLeadDialog;
