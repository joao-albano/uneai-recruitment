
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductType } from '@/context/ProductContext';
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
  // Se não for superadmin, não renderiza o componente
  if (!isSuperAdmin) return null;
  
  // Função para alternar o estado ativo do produto
  const toggleProductActive = (productType: ProductType) => {
    if (!selectedOrganization) return;
    
    try {
      // Cria uma cópia profunda do objeto antes de modificá-lo
      const updatedOrg = JSON.parse(JSON.stringify(selectedOrganization)) as OrganizationType;
      
      // Garante que products seja um array
      if (!updatedOrg.products) {
        updatedOrg.products = [];
      }
      
      const productIndex = updatedOrg.products.findIndex(p => p.type === productType);
      
      if (productIndex >= 0) {
        // Atualiza produto existente
        const updatedProducts = [...updatedOrg.products];
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          active: !updatedProducts[productIndex].active
        };
        updatedOrg.products = updatedProducts;
      } else {
        // Adiciona novo produto
        updatedOrg.products = [
          ...updatedOrg.products,
          { type: productType, active: true }
        ];
      }
      
      // Atualiza o estado com a nova cópia
      setSelectedOrganization(updatedOrg);
    } catch (error) {
      console.error("Erro ao alterar produto:", error);
    }
  };
  
  // Verifica se um produto está ativo
  const isProductActive = (productType: ProductType): boolean => {
    if (!selectedOrganization || !selectedOrganization.products) return false;
    
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
