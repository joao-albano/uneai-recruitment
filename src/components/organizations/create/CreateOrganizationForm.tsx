
import React from 'react';
import { NewOrganizationType } from '../types';
import { ProductType } from '@/context/ProductContext';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getProductDisplayName } from '@/components/users/utils/userUtils';
import OrganizationNameInput from '../shared/OrganizationNameInput';
import OrganizationActiveToggle from '../shared/OrganizationActiveToggle';

interface CreateOrganizationFormProps {
  newOrganization: NewOrganizationType;
  setNewOrganization: React.Dispatch<React.SetStateAction<NewOrganizationType>>;
}

const CreateOrganizationForm: React.FC<CreateOrganizationFormProps> = ({
  newOrganization,
  setNewOrganization
}) => {
  // Function to toggle product active state
  const toggleProductActive = (productType: ProductType) => {
    try {
      // Create a copy of the current products array or initialize if it doesn't exist
      const currentProducts = newOrganization.products ? [...newOrganization.products] : [];
      
      // Update the product state
      const productIndex = currentProducts.findIndex(p => p.type === productType);
      
      if (productIndex >= 0) {
        // Update existing product
        currentProducts[productIndex] = {
          ...currentProducts[productIndex],
          active: !currentProducts[productIndex].active
        };
      } else {
        // Add new product
        currentProducts.push({
          type: productType,
          active: true
        });
      }
      
      // Update the state
      setNewOrganization({
        ...newOrganization,
        products: currentProducts
      });
    } catch (error) {
      console.error("Erro ao alterar produto:", error);
    }
  };
  
  // Check if a product is active
  const isProductActive = (productType: ProductType): boolean => {
    if (!newOrganization.products) return false;
    
    const product = newOrganization.products.find(p => p.type === productType);
    return product ? product.active : false;
  };
  
  // List of all available product types
  const allProductTypes: ProductType[] = ['retention', 'billing', 'recruitment', 'secretary', 'pedagogical'];

  return (
    <div className="grid gap-4 py-4">
      <OrganizationNameInput 
        value={newOrganization.name}
        onChange={(e) => setNewOrganization({...newOrganization, name: e.target.value})}
      />
      
      <OrganizationActiveToggle
        isActive={newOrganization.isActive || false}
        onChange={(isActive) => setNewOrganization({...newOrganization, isActive})}
      />
      
      {/* Products selection */}
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
  );
};

export default CreateOrganizationForm;
