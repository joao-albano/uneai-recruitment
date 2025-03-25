
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CreateOrganizationForm from './create/CreateOrganizationForm';

interface CreateOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateOrganizationDialog: React.FC<CreateOrganizationDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission via form
    onOpenChange(false);
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
          <CreateOrganizationForm />
          
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
