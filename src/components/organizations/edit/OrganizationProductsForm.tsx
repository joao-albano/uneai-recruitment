
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductType, useProduct } from '@/context/ProductContext';
import { OrganizationType } from '../types';
import { getProductDisplayName } from '@/components/users/utils/userUtils';

interface OrganizationProductsFormProps {
  selectedOrganization: OrganizationType;
  setSelectedOrganization: React.Dispatch<React.SetStateAction<OrganizationType | null>>;
  isSuperAdmin: boolean;
}

const OrganizationProductsForm: React.FC<OrganizationProductsFormProps> = ({
  selectedOrganization,
  setSelectedOrganization,
  isSuperAdmin
}) => {
  const { userSubscriptions } = useProduct();
  
  // Encontrar as assinaturas desta organização
  const orgSubscriptions = userSubscriptions.filter(
    sub => sub.organizationId === selectedOrganization.id
  );
  
  // Se não for super admin, não pode editar as assinaturas
  if (!isSuperAdmin) return null;
  
  // Função para alternar o estado ativo de um produto
  const toggleProductActive = (productType: ProductType) => {
    const subscription = orgSubscriptions.find(sub => sub.productType === productType);
    
    if (subscription) {
      // Criar nova versão do selectedOrganization com produtos atualizados
      const updatedOrg = structuredClone(selectedOrganization);
      
      // Atualizar o active status do produto na organização
      if (!updatedOrg.products) {
        updatedOrg.products = [];
      }
      
      const productIndex = updatedOrg.products.findIndex(p => p.type === productType);
      
      if (productIndex >= 0) {
        // Atualizar produto existente
        updatedOrg.products[productIndex].active = !updatedOrg.products[productIndex].active;
      } else {
        // Adicionar novo produto
        updatedOrg.products.push({
          type: productType,
          active: true
        });
      }
      
      setSelectedOrganization(updatedOrg);
    }
  };
  
  // Verificar se um produto está ativo
  const isProductActive = (productType: ProductType): boolean => {
    if (!selectedOrganization.products) return false;
    
    const product = selectedOrganization.products.find(p => p.type === productType);
    return product ? product.active : false;
  };
  
  // Lista de todos os tipos de produtos disponíveis
  const allProductTypes: ProductType[] = ['retention', 'billing', 'recruitment'];
  
  return (
    <div className="grid gap-2 pt-4 border-t">
      <Label className="mb-2">Produtos Ativos para esta Organização</Label>
      <div className="grid gap-2">
        {allProductTypes.map(productType => (
          <div key={productType} className="flex items-center space-x-2">
            <Checkbox 
              id={`product-${productType}`} 
              checked={isProductActive(productType)}
              onCheckedChange={() => toggleProductActive(productType)}
            />
            <Label 
              htmlFor={`product-${productType}`}
              className="text-sm font-normal"
            >
              {getProductDisplayName(productType)}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationProductsForm;
