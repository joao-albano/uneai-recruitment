
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { OrganizationType } from './types';
import { InfoIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import OrganizationProductsForm from './edit/OrganizationProductsForm';

interface EditOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrganization: OrganizationType | null;
  setSelectedOrganization: React.Dispatch<React.SetStateAction<OrganizationType | null>>;
  onSubmit: (e: React.FormEvent) => void;
}

const EditOrganizationDialog: React.FC<EditOrganizationDialogProps> = ({
  open,
  onOpenChange,
  selectedOrganization,
  setSelectedOrganization,
  onSubmit
}) => {
  const { isSuperAdmin } = useAuth();
  
  // Se não houver organização selecionada, não renderiza o diálogo
  if (!selectedOrganization) return null;
  
  // Atualiza campos do formulário com segurança usando cópias profundas
  const updateField = (field: string, value: any) => {
    if (!selectedOrganization) return;
    
    // Cria uma cópia profunda da organização para evitar problemas de referência
    const updatedOrg = JSON.parse(JSON.stringify(selectedOrganization));
    updatedOrg[field] = value;
    setSelectedOrganization(updatedOrg);
  };
  
  // Função segura para lidar com o fechamento do diálogo
  const handleCloseDialog = () => {
    onOpenChange(false);
  };
  
  // Função para lidar com a submissão do formulário com segurança
  const handleSubmitWithSafety = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
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
        
        <form onSubmit={handleSubmitWithSafety}>
          <div className="grid gap-4 py-4">
            {selectedOrganization.isMainOrg && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-2">
                <div className="flex items-center gap-2">
                  <InfoIcon className="h-4 w-4 text-amber-500" />
                  <p className="text-sm text-amber-700 font-medium">Organização Principal</p>
                </div>
                <p className="text-xs text-amber-600 mt-1">
                  Esta é a organização principal do sistema UNE CX.
                </p>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nome da Organização</Label>
              <Input 
                id="edit-name" 
                value={selectedOrganization.name}
                onChange={(e) => updateField('name', e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="edit-active">Organização Ativa</Label>
                <p className="text-xs text-muted-foreground">
                  Organizações inativas não terão acesso ao sistema
                </p>
              </div>
              <Switch 
                id="edit-active"
                checked={selectedOrganization.isActive}
                onCheckedChange={(checked) => updateField('isActive', checked)}
              />
            </div>
            
            {/* Componente de gerenciamento de produtos */}
            <OrganizationProductsForm 
              selectedOrganization={selectedOrganization}
              setSelectedOrganization={setSelectedOrganization}
              isSuperAdmin={isSuperAdmin}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrganizationDialog;
