
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  isActive: boolean;
  onNavigate: (productType: string) => void;
  onSubscribe: (productType: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  icon,
  iconColor,
  isActive,
  onNavigate,
  onSubscribe
}) => {
  const comingSoon = !isActive;
  
  // Split the iconColor string to extract bg and text colors
  const iconColorClasses = iconColor.split(' ');
  const bgColorClass = iconColorClasses[0] || 'bg-gray-100';
  const textColorClass = iconColorClasses[1] || 'text-gray-700';
  
  return (
    <div className={cn(
      "bg-white rounded-xl border p-6 flex flex-col h-full transition-all duration-300",
      isActive ? "border-gray-200 hover:shadow-md" : "border-gray-100"
    )}>
      <div className="flex items-start justify-between mb-5">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          bgColorClass
        )}>
          <div className={cn(textColorClass, "opacity-80")}>
            {icon}
          </div>
        </div>
        <Badge 
          variant={isActive ? "default" : "outline"} 
          className={cn(
            "text-xs font-medium",
            isActive ? "bg-blue-100 hover:bg-blue-100 text-blue-700 border-transparent" : 
                      "text-gray-500 border-gray-200"
          )}
        >
          {isActive ? "Ativo" : "Em breve"}
        </Badge>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-6 flex-grow">
        {description}
      </p>
      
      {isActive ? (
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
          onClick={() => window.open('https://preview--une-ai-escuta.lovable.app', '_blank', 'noopener,noreferrer')}
        >
          Acessar <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button 
          variant="outline" 
          className="w-full text-gray-600 border-gray-200" 
          onClick={() => onSubscribe(id)}
          disabled={comingSoon}
        >
          {comingSoon ? "Em breve" : "Assinar"}
        </Button>
      )}
    </div>
  );
};

export default ProductCard;
