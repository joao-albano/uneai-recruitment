
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface RegistryRuleStats {
  code: string;
  count: number;
  type: 'human' | 'ai';
}

// Mock data - em produção isso viria da API
const mockData: RegistryRuleStats[] = [
  { code: 'INT', count: 45, type: 'human' },
  { code: 'NAO', count: 15, type: 'human' },
  { code: 'AGD', count: 30, type: 'ai' },
];

const RegistryRulesStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Uso por Código</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <XAxis dataKey="code" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total de Registros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            {mockData.reduce((acc, curr) => acc + curr.count, 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            Total de tabulações registradas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição IA vs Humano</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Humano</span>
              <span className="font-bold">
                {mockData
                  .filter(d => d.type === 'human')
                  .reduce((acc, curr) => acc + curr.count, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>IA</span>
              <span className="font-bold">
                {mockData
                  .filter(d => d.type === 'ai')
                  .reduce((acc, curr) => acc + curr.count, 0)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistryRulesStats;
