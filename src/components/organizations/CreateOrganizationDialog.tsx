
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { NewOrganizationType } from './types';
import { Checkbox } from "@/components/ui/checkbox";
import { ProductType } from '@/context/ProductContext';
import { getProductDisplayName } from '@/components/users/utils/userUtils';

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
  // Função para alternar o estado ativo de um produto
  const toggleProductActive = (productType: ProductType) => {
    try {
      // Criar uma cópia do array de produtos atual ou inicializar se não existir
      const currentProducts = newOrganization.products ? [...newOrganization.products] : [];
      
      // Atualizar o estado do produto
      const productIndex = currentProducts.findIndex(p => p.type === productType);
      
      if (productIndex >= 0) {
        // Atualizar produto existente
        currentProducts[productIndex] = {
          ...currentProducts[productIndex],
          active: !currentProducts[productIndex].active
        };
      } else {
        // Adicionar novo produto
        currentProducts.push({
          type: productType,
          active: true
        });
      }
      
      // Atualizar o estado
      setNewOrganization({
        ...newOrganization,
        products: currentProducts
      });
    } catch (error) {
      console.error("Erro ao alterar produto:", error);
    }
  };
  
  // Verificar se um produto está ativo
  const isProductActive = (productType: ProductType): boolean => {
    if (!newOrganization.products) return false;
    
    const product = newOrganization.products.find(p => p.type === productType);
    return product ? product.active : false;
  };
  
  // Lista de todos os tipos de produtos disponíveis
  const allProductTypes: ProductType[] = ['retention', 'billing', 'recruitment'];
  
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
                placeholder="Digite o nome da organização"
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
            
            {/* Adiciona a seleção de produtos */}
            <div className="grid gap-2 pt-4 border-t">
              <Label className="mb-2">Produtos Ativos para esta Organização</Label>
              <div className="grid gap-2">
                {allProductTypes.map(productType => (
                  <div key={productType} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`new-product-${productType}`} 
                      checked={isProductActive(productType)}
                      onCheckedChange={() => toggleProductActive(productType)}
                    />
                    <Label 
                      htmlFor={`new-product-${productType}`}
                      className="text-sm font-normal"
                    >
                      {getProductDisplayName(productType)}
                    </Label>
                  </div>
                ))}
              </div>
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
