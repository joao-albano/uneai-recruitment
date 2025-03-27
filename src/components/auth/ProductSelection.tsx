
import React, { useMemo, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import ProductCard from './products/ProductCard';
import PriceSummary from './products/PriceSummary';
import { getProductsBySegment, calculateTotalPrice } from './products/productData';

const ProductSelection = () => {
  const { control, watch, setValue } = useFormContext();
  const selectedProductIds = watch('selectedProducts') || [];
  const marketSegment = useWatch({ control, name: 'marketSegment' });
  const customSegment = useWatch({ control, name: 'customSegment' });
  
  // Define products based on market segment
  const segmentProducts = useMemo(() => {
    console.log('Market segment changed:', marketSegment);
    const products = getProductsBySegment(marketSegment);
    console.log('Products for segment:', products);
    return products;
  }, [marketSegment]);
  
  // Calculate total price
  const totalPrice = calculateTotalPrice(selectedProductIds);
  
  // Set default selection if no products selected and we have segment products
  useEffect(() => {
    if (segmentProducts.length > 0 && selectedProductIds.length === 0) {
      setValue('selectedProducts', [segmentProducts[0].id]);
    }
  }, [segmentProducts, selectedProductIds.length, setValue]);

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

      {segmentProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {segmentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-6 text-center bg-slate-50 rounded-lg">
          <p className="text-muted-foreground">Selecione um segmento para ver os produtos recomendados.</p>
        </div>
      )}

      <PriceSummary totalPrice={totalPrice} />
    </div>
  );
};

export default ProductSelection;
