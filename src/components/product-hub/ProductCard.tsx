
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductType } from '@/context/ProductContext';

interface ProductCardProps {
  id: ProductType;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  isActive: boolean;
  onNavigate: (productType: ProductType) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  icon,
  iconColor,
  isActive,
  onNavigate
}) => {
  const isComingSoon = !isActive;
  
  return (
    <div className="bg-white rounded-lg border p-6 flex flex-col h-full">
      <div className="flex mb-2">
        <div className={`w-10 h-10 ${iconColor}`}>
          {icon}
        </div>
        <div className="ml-auto">
          {isActive ? (
            <Badge className="bg-blue-500 hover:bg-blue-600">Ativo</Badge>
          ) : (
            <Badge variant="secondary">Em breve</Badge>
          )}
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-6 flex-grow">
        {description}
      </p>
      
      {isActive ? (
        <Button 
          className="w-full" 
          onClick={() => onNavigate(id)}
        >
          Acessar
        </Button>
      ) : (
        <Button 
          variant="outline" 
          className="w-full" 
          disabled
        >
          Em breve
        </Button>
      )}
    </div>
  );
};

export default ProductCard;
