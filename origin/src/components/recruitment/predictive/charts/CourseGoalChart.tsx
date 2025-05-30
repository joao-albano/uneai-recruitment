
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Mock data for course goal percentages
const data = [
  { name: 'Administração', percentage: 94.7 },
  { name: 'Direito', percentage: 108.3 },
  { name: 'Psicologia', percentage: 91.7 },
  { name: 'Eng. Civil', percentage: 72.2 },
  { name: 'Ciência da Comp.', percentage: 115 },
];

export const CourseGoalChart = () => {
  const getBarColor = (percentage: number) => {
    if (percentage >= 100) return '#22c55e';
    if (percentage >= 80) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <ChartContainer
      config={{
        percentage: { color: "#8b5cf6" },
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
          <YAxis domain={[0, 120]} tickFormatter={(value) => `${value}%`} />
          <ChartTooltip
            content={
              <ChartTooltipContent 
                formatter={(value) => [`${value}%`, 'Atingimento']} 
                labelFormatter={(value) => `Curso: ${value}`}
              />
            }
          />
          <Legend formatter={() => 'Percentual de Atingimento'} />
          <Bar dataKey="percentage" name="percentage">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.percentage)} />
            ))}
          </Bar>
          {/* Reference line for 100% */}
          <line
            x1="0%"
            y1="100%"
            x2="100%"
            y2="100%"
            stroke="#333"
            strokeDasharray="5 5"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
