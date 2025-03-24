
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OrganizationType } from './types';
import { AlertTriangle } from 'lucide-react';

interface DeleteOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrganization: OrganizationType | null;
  onDelete: () => void;
}

const DeleteOrganizationDialog: React.FC<DeleteOrganizationDialogProps> = ({
  open,
  onOpenChange,
  selectedOrganization,
  onDelete
}) => {
  if (!selectedOrganization) return null;
  
  // Não permitir excluir a organização principal (UNE CX)
  if (selectedOrganization.isMainOrg) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
              Ação não permitida
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4">
              Não é possível remover a organização principal (UNE CX).
            </p>
            
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)}>
                Entendi
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Remover Organização
          </DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Todos os usuários desta organização serão afetados.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="mb-4">
            Você está prestes a remover a organização <strong>{selectedOrganization.name}</strong>.
          </p>
          
          <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 mb-4">
            <h4 className="font-medium text-destructive mb-2">Consequências da remoção:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Todos os usuários perderão acesso ao sistema</li>
              <li>Todas as assinaturas serão canceladas</li>
              <li>Todos os dados associados serão inacessíveis</li>
            </ul>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              Remover Permanentemente
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteOrganizationDialog;
