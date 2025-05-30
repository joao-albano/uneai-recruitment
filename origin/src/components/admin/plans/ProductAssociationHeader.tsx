
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ProductType } from '@/context/ProductContext';

interface ProductAssociationHeaderProps {
  associatedProducts: ProductType[];
  onManageClick: () => void;
}

const ProductAssociationHeader: React.FC<ProductAssociationHeaderProps> = ({
  associatedProducts,
  onManageClick
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm text-muted-foreground">
        {isPtBR 
          ? `${associatedProducts.length} produto(s) associado(s)` 
          : `${associatedProducts.length} associated product(s)`}
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1"
        onClick={onManageClick}
      >
        <Plus className="h-4 w-4" />
        {isPtBR ? 'Gerenciar produtos' : 'Manage products'}
      </Button>
    </div>
  );
};

export default ProductAssociationHeader;
