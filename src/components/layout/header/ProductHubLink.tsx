
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductHubLink: React.FC = () => {
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
