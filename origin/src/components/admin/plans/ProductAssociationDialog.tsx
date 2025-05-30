
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { ProductType } from '@/context/product/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
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
  planId: string;
}

const ProductAssociationDialog: React.FC<ProductAssociationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  availableProducts,
  selectedProducts,
  planName,
  planId,
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  const [selection, setSelection] = useState<ProductType[]>([...selectedProducts]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setSelection([...selectedProducts]);
    }
  }, [open, selectedProducts]);

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

  const handleSave = async () => {
    setIsSubmitting(true);
    
    try {
      // Update the plan in the database with the selected products
      const { error } = await supabase
        .from('plans')
        .update({ 
          associated_products: selection 
        })
        .eq('id', planId);
      
      if (error) {
        console.error('Error updating plan products:', error);
        toast.error(isPtBR 
          ? 'Erro ao atualizar produtos do plano' 
          : 'Error updating plan products');
        return;
      }
      
      toast.success(isPtBR 
        ? 'Produtos do plano atualizados com sucesso' 
        : 'Plan products updated successfully');
      
      onConfirm(selection);
    } catch (err) {
      console.error('Error in saving products:', err);
      toast.error(isPtBR 
        ? 'Erro ao salvar alterações' 
        : 'Error saving changes');
    } finally {
      setIsSubmitting(false);
      onOpenChange(false);
    }
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

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            {isPtBR ? 'Cancelar' : 'Cancel'}
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting 
              ? (isPtBR ? 'Salvando...' : 'Saving...') 
              : (isPtBR ? 'Salvar alterações' : 'Save changes')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductAssociationDialog;
