
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { ProductType } from '@/context/ProductContext';
import ProductCheckboxItem from './ProductCheckboxItem';

interface Product {
  id: ProductType;
  name: string;
  description: string;
}

interface ProductAssociationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (selectedProducts?: ProductType[]) => void;
  availableProducts: Product[];
  selectedProducts: ProductType[];
  planName: string;
}

const ProductAssociationDialog: React.FC<ProductAssociationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  availableProducts,
  selectedProducts,
  planName,
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  const [selection, setSelection] = useState<ProductType[]>([...selectedProducts]);

  const handleProductToggle = (productId: ProductType) => {
    setSelection(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleCancel = () => {
    setSelection([...selectedProducts]);
    onOpenChange(false);
  };

  const handleSave = () => {
    onConfirm(selection);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isPtBR ? `Gerenciar produtos do plano ${planName}` : `Manage products for ${planName} plan`}
          </DialogTitle>
          <DialogDescription>
            {isPtBR 
              ? 'Selecione os produtos que estarão disponíveis neste plano.' 
              : 'Select the products that will be available in this plan.'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 max-h-[300px] overflow-y-auto space-y-4">
          {availableProducts.map(product => (
            <ProductCheckboxItem 
              key={product.id}
              product={product}
              isSelected={selection.includes(product.id)}
              onToggle={handleProductToggle}
            />
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            {isPtBR ? 'Cancelar' : 'Cancel'}
          </Button>
          <Button onClick={handleSave}>
            {isPtBR ? 'Salvar alterações' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductAssociationDialog;
