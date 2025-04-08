
import React from 'react';
import { useConversionData } from './conversion/hooks/useConversionData';
import { ConversionFunnelCard } from './conversion/components/ConversionFunnelCard';
import { ConversionByCourseChart } from './conversion/components/ConversionByCourseChart';
import { ConversionBySourceChart } from './conversion/components/ConversionBySourceChart';
import { ConversionTrendChart } from './conversion/components/ConversionTrendChart';
import { FunnelBottlenecksCard } from './conversion/components/FunnelBottlenecksCard';

const ConversionTab: React.FC = () => {
  const {
    funnelData,
    conversionByCourse,
    conversionBySource,
    conversionOverTime,
    bottlenecks
  } = useConversionData();
  
  return (
    <div className="space-y-6">
      {/* Funil de Conversão Aprimorado */}
      <ConversionFunnelCard funnelData={funnelData} />
      
      {/* Gráficos de conversão por curso e por canal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConversionByCourseChart data={conversionByCourse} />
        <ConversionBySourceChart data={conversionBySource} />
      </div>
      
      {/* Gráfico de tendência */}
      <ConversionTrendChart data={conversionOverTime} />
      
      {/* Gargalos no funil */}
      <FunnelBottlenecksCard bottlenecks={bottlenecks} />
    </div>
  );
};

export default ConversionTab;
