
import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Mock data for model metrics
const data = [
  { metric: 'Accurácia', value: 89.4 },
  { metric: 'Precisão', value: 86.2 },
  { metric: 'Recall', value: 83.5 },
  { metric: 'F1 Score', value: 84.8 },
  { metric: 'AUC-ROC', value: 92.1 },
];

export const ModelMetricsChart = () => {
  return (
    <ChartContainer
      config={{
        value: { color: "#8b5cf6" },
      }}
      className="w-full aspect-[4/3]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Métricas Atuais"
            dataKey="value"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.6}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
