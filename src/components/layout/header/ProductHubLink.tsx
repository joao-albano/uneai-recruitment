
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProduct } from '@/context/ProductContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ProductHubLink: React.FC = () => {
  const { availableProducts } = useProduct();
  
  // Só mostrar o link se o usuário tiver acesso a mais de um produto
  if (availableProducts.length <= 1) {
    return null;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/hub">
            <Button variant="ghost" size="sm" className="gap-1">
              <Grid className="h-4 w-4" />
              <span>Produtos</span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Acesse todos os produtos</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProductHubLink;
