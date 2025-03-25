
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CreateOrganizationForm from './create/CreateOrganizationForm';
import { NewOrganizationType } from './types';
import { createOrganization } from './api';
import { toast } from "sonner";

interface CreateOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => Promise<void>;
}

const CreateOrganizationDialog: React.FC<CreateOrganizationDialogProps> = ({
  open,
  onOpenChange,
  onCreated,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newOrganization, setNewOrganization] = useState<NewOrganizationType>({
    name: '',
    isActive: true,
    products: []
  });
  
  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setNewOrganization({
        name: '',
        isActive: true,
        products: []
      });
    }
  }, [open]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newOrganization.name.trim()) {
      toast.error("O nome da organização é obrigatório");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      console.log('Criando nova organização:', newOrganization);
      
      // Create the organization in Supabase
      await createOrganization(newOrganization);
      
      // Show success message
      toast.success("Organização criada com sucesso");
      
      // Close the dialog
      onOpenChange(false);
      
      // Refresh the organizations list
      await onCreated();
    } catch (error) {
      console.error("Erro ao criar organização:", error);
      
      // Show error message
      if (error instanceof Error) {
        toast.error(`Erro ao criar organização: ${error.message}`);
      } else {
        toast.error("Erro desconhecido ao criar organização");
      }
    } finally {
      setIsSubmitting(false);
    }
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Criando..." : "Criar Organização"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrganizationDialog;
