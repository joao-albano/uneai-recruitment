
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProduct } from '@/context/ProductContext';

const ProductHubLink: React.FC = () => {
  const { availableProducts } = useProduct();
  
  // Só mostrar o link se o usuário tiver acesso a mais de um produto
  if (availableProducts.length <= 1) {
    return null;
  }
  
  return (
    <Link to="/hub">
      <Button variant="ghost" size="sm" className="gap-1">
        <Grid className="h-4 w-4" />
        <span>Produtos</span>
      </Button>
    </Link>
  );
};

export default ProductHubLink;
