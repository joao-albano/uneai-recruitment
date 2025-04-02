
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Mock data for enrollment predictions
const data = [
  { name: 'Administração', target: 150, predicted: 142 },
  { name: 'Direito', target: 180, predicted: 195 },
  { name: 'Psicologia', target: 120, predicted: 110 },
  { name: 'Eng. Civil', target: 90, predicted: 65 },
  { name: 'Ciência da Comp.', target: 100, predicted: 115 },
];

export const EnrollmentPredictionChart = () => {
  return (
    <ChartContainer
      config={{
        target: { color: "#8b5cf6" },
        predicted: { color: "#06b6d4" },
      }}
      className="w-full aspect-[4/3]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip
            content={
              <ChartTooltipContent labelKey="name" formatter={(value, name) => [`${value}`, name === 'target' ? 'Meta' : 'Previsto']} />
            }
          />
          <Legend formatter={(value) => (value === 'target' ? 'Meta' : 'Previsto')} />
          <Bar dataKey="target" fill="var(--color-target)" name="target" />
          <Bar dataKey="predicted" fill="var(--color-predicted)" name="predicted" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
