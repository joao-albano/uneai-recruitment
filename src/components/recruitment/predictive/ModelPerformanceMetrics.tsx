
import React from 'react';
import SummaryCards from './model-metrics/SummaryCards';
import ModelInfoCard from './model-metrics/ModelInfoCard';
import HistoryChartCard from './model-metrics/HistoryChartCard';
import SegmentPerformanceTable from './model-metrics/SegmentPerformanceTable';
import MetricsExplanationCard from './model-metrics/MetricsExplanationCard';
import { modelMetrics, getBadgeColor } from './model-metrics/modelMetricsData';

interface ModelPerformanceMetricsProps {
  selectedPeriod: string;
}

const ModelPerformanceMetrics: React.FC<ModelPerformanceMetricsProps> = ({ selectedPeriod }) => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <SummaryCards 
        metrics={modelMetrics.overall} 
        getBadgeColor={getBadgeColor} 
      />
      
      {/* Model Information Card */}
      <ModelInfoCard modelInfo={modelMetrics.overall} />
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6">
        <HistoryChartCard />
      </div>
      
      {/* Segment Performance */}
      <SegmentPerformanceTable 
        segments={modelMetrics.bySegment}
        getBadgeColor={getBadgeColor}
      />
      
      {/* Model explanation */}
      <MetricsExplanationCard />
    </div>
  );
};

export default ModelPerformanceMetrics;
