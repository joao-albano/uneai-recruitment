
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { NewOrganizationType } from './types';

interface CreateOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newOrganization: NewOrganizationType;
  setNewOrganization: React.Dispatch<React.SetStateAction<NewOrganizationType>>;
  onSubmit: (e: React.FormEvent) => void;
}

const CreateOrganizationDialog: React.FC<CreateOrganizationDialogProps> = ({
  open,
  onOpenChange,
  newOrganization,
  setNewOrganization,
  onSubmit
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Organização</DialogTitle>
          <DialogDescription>
            Adicione uma nova organização ao sistema
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da Organização</Label>
              <Input 
                id="name" 
                value={newOrganization.name}
                onChange={(e) => setNewOrganization({...newOrganization, name: e.target.value})}
                placeholder="Ex: Escola de Artes"
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="active">Organização Ativa</Label>
                <p className="text-xs text-muted-foreground">
                  Organizações inativas não terão acesso ao sistema
                </p>
              </div>
              <Switch 
                id="active"
                checked={newOrganization.isActive}
                onCheckedChange={(checked) => setNewOrganization({...newOrganization, isActive: checked})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar Organização</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrganizationDialog;
