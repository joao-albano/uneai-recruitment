
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users,
  TrendingUp,
  Zap
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';
import { OpportunityItem as OpportunityItemType } from '@/types/recruitment';

interface OpportunityItemProps {
  item: OpportunityItemType;
  onCreateCampaign: (item: OpportunityItemType) => void;
}

const OpportunityItem: React.FC<OpportunityItemProps> = ({ 
  item, 
  onCreateCampaign 
}) => {
  const getUrgencyColor = (urgency: string): string => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <tr className="hover:bg-muted/50">
      <td className="px-4 py-3">
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-muted-foreground line-clamp-1">
          {item.description}
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge variant="outline">
          {item.type === 'course' && 'Curso'}
          {item.type === 'location' && 'Localidade'}
          {item.type === 'interest' && 'Interesse'}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{item.count}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          {item.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
          {item.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />}
          {item.trend === 'stable' && <div className="h-4 w-4 border-t-2 border-gray-400" />}
          <span className={
            item.trend === 'up' ? 'text-green-600' : 
            item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }>
            {item.trendPercentage}%
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="w-full">
          <Badge className={`${getUrgencyColor(item.urgency)} border`}>
            {item.urgency === 'high' && 'Alta'}
            {item.urgency === 'medium' && 'Média'}
            {item.urgency === 'low' && 'Baixa'}
          </Badge>
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onCreateCampaign(item)}
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span className="sr-only">Criar Campanha</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Criar Campanha</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </td>
    </tr>
  );
};

export default OpportunityItem;
