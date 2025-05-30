
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Separator } from '@/components/ui/separator';
import { Package } from 'lucide-react';
import { ProductType } from '@/context/ProductContext';

interface ProductListProps {
  associatedProducts: ProductType[];
  getProductDetails: (productId: ProductType) => {
    id: ProductType;
    name: string;
    description: string;
  };
}

const ProductList: React.FC<ProductListProps> = ({
  associatedProducts,
  getProductDetails
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';

  if (associatedProducts.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {isPtBR 
          ? 'Nenhum produto associado a este plano' 
          : 'No products associated with this plan'}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {associatedProducts.map(productId => {
        const product = getProductDetails(productId);
        return (
          <div key={productId} className="flex items-center p-2 border rounded-md">
            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
            <div>
              <div className="font-medium">{product.name}</div>
              <div className="text-xs text-muted-foreground">{product.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
