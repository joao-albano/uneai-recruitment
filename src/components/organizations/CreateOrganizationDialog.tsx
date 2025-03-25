
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewOrganizationType } from './types';
import CreateOrganizationForm from './create/CreateOrganizationForm';

interface CreateOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newOrganization: NewOrganizationType;
  setNewOrganization: React.Dispatch<React.SetStateAction<NewOrganizationType>>;
  onSubmit: (values: { name?: string; isActive?: boolean }) => Promise<void>;
}

const CreateOrganizationDialog: React.FC<CreateOrganizationDialogProps> = ({
  open,
  onOpenChange,
  newOrganization,
  setNewOrganization,
  onSubmit
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: newOrganization.name,
      isActive: newOrganization.isActive
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Organização</DialogTitle>
          <DialogDescription>
            Adicione uma nova organização ao sistema
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <CreateOrganizationForm 
            newOrganization={newOrganization}
            setNewOrganization={setNewOrganization}
          />
          
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
