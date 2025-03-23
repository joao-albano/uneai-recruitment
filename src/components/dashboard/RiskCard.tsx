
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';

interface RiskCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
}

const RiskCard: React.FC<RiskCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  className = '',
  onClick 
}) => {
  return (
    <Card 
      className={`${className} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <p className="text-sm font-medium leading-none">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskCard;
