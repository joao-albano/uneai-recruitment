
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
  // If not super admin, don't render the component
  if (!isSuperAdmin) return null;
  
  // Function to toggle product active state
  const toggleProductActive = (productType: ProductType) => {
    if (!selectedOrganization) return;
    
    try {
      // Create a new version of selectedOrganization with updated products
      const updatedOrg = JSON.parse(JSON.stringify(selectedOrganization)) as OrganizationType;
      
      // Ensure products is an array
      if (!updatedOrg.products) {
        updatedOrg.products = [];
      }
      
      const productIndex = updatedOrg.products.findIndex(p => p.type === productType);
      
      if (productIndex >= 0) {
        // Update existing product
        updatedOrg.products[productIndex].active = !updatedOrg.products[productIndex].active;
      } else {
        // Add new product
        updatedOrg.products.push({
          type: productType,
          active: true
        });
      }
      
      setSelectedOrganization(updatedOrg);
    } catch (error) {
      console.error("Erro ao alterar produto:", error);
    }
  };
  
  // Check if a product is active
  const isProductActive = (productType: ProductType): boolean => {
    if (!selectedOrganization || !selectedOrganization.products) return false;
    
    const product = selectedOrganization.products.find(p => p.type === productType);
    return product ? product.active : false;
  };
  
  // List of all available product types
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
