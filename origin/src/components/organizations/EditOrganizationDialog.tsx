
import React, { useState } from 'react';
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
  const [editedOrganization, setEditedOrganization] = useState<OrganizationType | null>(organization);
  
  const handleSubmit = () => {
    if (editedOrganization) {
      onSubmit({
        name: editedOrganization.name,
        isActive: editedOrganization.isActive
      });
    }
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
        
        {editedOrganization && (
          <EditOrganizationForm 
            organization={editedOrganization} 
            setOrganization={setEditedOrganization}
          />
        )}
        
        <DialogFooter>
          <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleSubmit}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrganizationDialog;
