
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { modelMetrics } from '../model-metrics/modelMetricsData';

// Use the existing mock data from modelMetricsData instead of the local data
const data = modelMetrics.history;

export const ModelHistoryChart = () => {
  return (
    <ChartContainer
      config={{
        accuracy: { color: "#8b5cf6" },
        precision: { color: "#06b6d4" },
        recall: { color: "#f59e0b" },
        f1Score: { color: "#10b981" },
        aucRoc: { color: "#ef4444" },
      }}
      className="w-full h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 11 }}
            tickMargin={10}
            height={30}
          />
          <YAxis 
            domain={[70, 100]} 
            tick={{ fontSize: 11 }}
            tickMargin={5}
            width={30}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent 
                formatter={(value) => [`${value}%`, 'Valor']} 
                labelFormatter={(value) => `Data: ${value}`}
              />
            }
          />
          <Legend 
            formatter={(value) => {
              switch(value) {
                case 'accuracy': return 'Acurácia';
                case 'precision': return 'Precisão';
                case 'recall': return 'Recall';
                case 'f1Score': return 'F1 Score';
                case 'aucRoc': return 'AUC-ROC';
                default: return value;
              }
            }}
            wrapperStyle={{ 
              paddingTop: '10px',
              fontSize: '11px',
              bottom: 0
            }}
          />
          <Line 
            type="monotone" 
            dataKey="accuracy" 
            stroke="var(--color-accuracy)" 
            activeDot={{ r: 6 }} 
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="precision" 
            stroke="var(--color-precision)" 
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="recall" 
            stroke="var(--color-recall)" 
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="f1Score" 
            stroke="var(--color-f1Score)" 
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="aucRoc" 
            stroke="var(--color-aucRoc)" 
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
