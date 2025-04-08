
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, BarChart, ResponsiveContainer, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

interface DistributionChartsProps {
  channelDistribution: any[];
  weeklyDistribution: any[];
  totalLeads: number;
}

export const DistributionCharts: React.FC<DistributionChartsProps> = ({
  channelDistribution,
  weeklyDistribution,
  totalLeads
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Leads por Canal</CardTitle>
          <CardDescription>Volume de leads captados por canal</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={channelDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {channelDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => {
                // Convert values to numbers to ensure proper arithmetic operations
                const numericValue = Number(value);
                const percentage = (numericValue / totalLeads * 100).toFixed(1);
                return [`${numericValue} leads (${percentage}%)`, name];
              }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Desempenho Semanal</CardTitle>
          <CardDescription>Volume diário de leads por canal</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="whatsapp" name="WhatsApp" fill="#25D366" />
              <Bar dataKey="facebook" name="Facebook" fill="#1877F2" />
              <Bar dataKey="instagram" name="Instagram" fill="#E1306C" />
              <Bar dataKey="google" name="Google" fill="#4285F4" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
