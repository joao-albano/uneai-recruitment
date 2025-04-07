
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Mock data for model history
const data = [
  { date: '2023-11', accuracy: 83.2, precision: 79.5, recall: 75.8, f1Score: 77.6, aucRoc: 86.4 },
  { date: '2023-12', accuracy: 84.7, precision: 81.3, recall: 77.9, f1Score: 79.6, aucRoc: 87.8 },
  { date: '2024-01', accuracy: 85.9, precision: 82.6, recall: 79.4, f1Score: 81.0, aucRoc: 89.1 },
  { date: '2024-02', accuracy: 87.2, precision: 83.9, recall: 81.2, f1Score: 82.5, aucRoc: 90.3 },
  { date: '2024-03', accuracy: 88.5, precision: 85.1, recall: 82.3, f1Score: 83.7, aucRoc: 91.4 },
  { date: '2024-04', accuracy: 89.4, precision: 86.2, recall: 83.5, f1Score: 84.8, aucRoc: 92.1 }
];

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
          <Line type="monotone" dataKey="accuracy" stroke="var(--color-accuracy)" activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="precision" stroke="var(--color-precision)" />
          <Line type="monotone" dataKey="recall" stroke="var(--color-recall)" />
          <Line type="monotone" dataKey="f1Score" stroke="var(--color-f1Score)" />
          <Line type="monotone" dataKey="aucRoc" stroke="var(--color-aucRoc)" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
