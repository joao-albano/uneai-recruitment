
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ProductType } from '@/context/ProductContext';

interface ProductCheckboxItemProps {
  product: {
    id: ProductType;
    name: string;
    description: string;
  };
  isSelected: boolean;
  onToggle: (productId: ProductType) => void;
}

const ProductCheckboxItem: React.FC<ProductCheckboxItemProps> = ({
  product,
  isSelected,
  onToggle
}) => {
  return (
    <div className="flex space-x-2 items-start border p-3 rounded-md">
      <Checkbox 
        id={product.id} 
        checked={isSelected}
        onCheckedChange={() => onToggle(product.id)}
      />
      <div className="space-y-1">
        <Label htmlFor={product.id} className="font-medium cursor-pointer">
          {product.name}
        </Label>
        <p className="text-sm text-muted-foreground">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductCheckboxItem;
