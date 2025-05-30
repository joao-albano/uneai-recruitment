
import { useMemo } from 'react';
import { conversionData } from '../../../data/analyticsData';
import { Users, Check, Calendar, Building } from 'lucide-react';
import { ReactNode } from 'react';

export interface EnhancedFunnelStage {
  stage: string;
  count: number;
  percentage: number;
  color: string;
  icon: ReactNode;
}

export const useConversionData = () => {
  // Prepare funnel data with colors and icons
  const funnelData = useMemo(() => {
    const colors = ['#4F46E5', '#8B5CF6', '#EC4899', '#F59E0B', '#22C55E'];
    const icons = [
      <Users key="users" className="text-indigo-600" />,
      <Check key="check" className="text-purple-600" />,
      <Calendar key="calendar" className="text-pink-600" />,
      <Users key="visit" className="text-amber-600" />,
      <Building key="building" className="text-green-600" />
    ];
    
    return conversionData.funnelStages.map((stage, index) => {
      return {
        ...stage,
        color: colors[index % colors.length],
        icon: icons[index % icons.length]
      };
    });
  }, []);

  return {
    funnelData,
    conversionByCourse: conversionData.conversionByCourse,
    conversionBySource: conversionData.conversionBySource,
    conversionOverTime: conversionData.conversionOverTime,
    bottlenecks: conversionData.bottlenecks
  };
};
