
import React, { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import ProductCard from './products/ProductCard';
import PriceSummary from './products/PriceSummary';
import { getProductsBySegment, calculateTotalPrice } from './products/productData';

const ProductSelection = () => {
  const { control, watch } = useFormContext();
  const selectedProductIds = watch('selectedProducts') || [];
  const marketSegment = useWatch({ control, name: 'marketSegment' });
  const customSegment = useWatch({ control, name: 'customSegment' });
  
  // Define products based on market segment
  const segmentProducts = useMemo(() => {
    return getProductsBySegment(marketSegment);
  }, [marketSegment]);
  
  // Calculate total price
  const totalPrice = calculateTotalPrice(selectedProductIds);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Selecione seus produtos</h2>
        <p className="text-muted-foreground">
          Escolha os produtos que deseja utilizar. Você terá 14 dias para testar gratuitamente.
        </p>
        {marketSegment && (
          <p className="mt-2 text-sm font-medium text-blue-600">
            Produtos recomendados para segmento: {marketSegment === 'other' ? customSegment : marketSegment}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {segmentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <PriceSummary totalPrice={totalPrice} />
    </div>
  );
};

export default ProductSelection;
