
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TrendBadgeProps {
  index: number;
}

const TrendBadge: React.FC<TrendBadgeProps> = ({ index }) => {
  // Determinando o tipo de tendência com base no índice
  const trendType = index % 3;
  
  let badgeClass = '';
  let trendText = '';
  
  if (trendType === 0) {
    badgeClass = "bg-green-50 text-green-700 border-green-200";
    trendText = "↑ Em alta";
  } else if (trendType === 1) {
    badgeClass = "bg-amber-50 text-amber-700 border-amber-200";
    trendText = "→ Estável";
  } else {
    badgeClass = "bg-red-50 text-red-700 border-red-200";
    trendText = "↓ Em queda";
  }
  
  return (
    <Badge 
      variant="outline"
      className={badgeClass}
    >
      {trendText}
    </Badge>
  );
};

export default TrendBadge;
