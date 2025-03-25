
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OrganizationType } from './types';
import { z } from "zod";
import EditOrganizationForm from './edit/EditOrganizationForm';

interface EditOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization: OrganizationType;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  isActive: z.boolean().default(true),
});

const EditOrganizationDialog: React.FC<EditOrganizationDialogProps> = ({
  open,
  onOpenChange,
  organization,
  onSubmit
}) => {
  const submitHandler = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Organização</DialogTitle>
          <DialogDescription>
            Altere as informações da organização
          </DialogDescription>
        </DialogHeader>
        
        <EditOrganizationForm 
          organization={organization} 
          onSubmit={submitHandler} 
        />
        
        <DialogFooter>
          <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit" form="edit-organization-form">Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrganizationDialog;
