
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: string;  // Changed from ProductType to string
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  isActive: boolean;
  onNavigate: (productType: string) => void;  // Updated to match id type
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
    <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
        <div>
          {isActive ? (
            <Badge className="bg-blue-500 hover:bg-blue-600">Ativo</Badge>
          ) : (
            <Badge variant="outline" className="text-gray-500">Em breve</Badge>
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
