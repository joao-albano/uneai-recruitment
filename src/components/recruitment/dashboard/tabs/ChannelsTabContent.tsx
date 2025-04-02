
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ExternalLink } from 'lucide-react';

// Dados mock para distribuição de canais
const channelDistribution = [
  { name: 'Site', value: 173, color: '#4F46E5' },
  { name: 'WhatsApp', value: 124, color: '#22C55E' },
  { name: 'Facebook', value: 87, color: '#3B82F6' },
  { name: 'Google', value: 65, color: '#EF4444' },
  { name: 'Instagram', value: 52, color: '#EC4899' },
  { name: 'Indicação', value: 38, color: '#F59E0B' },
];

// Dados mock para performance de canais
const channelPerformance = [
  { 
    name: 'Site', 
    leads: 173, 
    matriculas: 34, 
    conversao: 19.7,
    cpl: 42.50,
    crescimento: 12.5
  },
  { 
    name: 'WhatsApp', 
    leads: 124, 
    matriculas: 28, 
    conversao: 22.6,
    cpl: 35.80,
    crescimento: 8.3
  },
  { 
    name: 'Facebook', 
    leads: 87, 
    matriculas: 15, 
    conversao: 17.2,
    cpl: 54.30,
    crescimento: -3.2
  },
  { 
    name: 'Google', 
    leads: 65, 
    matriculas: 12, 
    conversao: 18.5,
    cpl: 62.70,
    crescimento: 5.4
  },
  { 
    name: 'Instagram', 
    leads: 52, 
    matriculas: 9, 
    conversao: 17.3,
    cpl: 58.90,
    crescimento: 15.7
  },
  { 
    name: 'Indicação', 
    leads: 38, 
    matriculas: 10, 
    conversao: 26.3,
    cpl: 18.20,
    crescimento: 22.8
  },
];

const ChannelsTabContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Canais</CardTitle>
            <CardDescription>
              Análise de leads por canal de captação
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {channelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} leads`, 'Quantidade']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Custo por Lead (CPL)</CardTitle>
            <CardDescription>
              Investimento médio por lead adquirido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {channelPerformance.map((channel, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{channel.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        R$ {channel.cpl.toFixed(2).replace('.', ',')}
                      </span>
                      <Badge className={channel.crescimento > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {channel.crescimento > 0 ? "+" : ""}{channel.crescimento.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={100 - (channel.cpl / 70) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Performance por Canal</CardTitle>
            <CardDescription>
              Comparativo entre canais de captação
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto flex items-center gap-1">
            <span>Últimos 30 dias</span>
            <ExternalLink className="h-3 w-3" />
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr className="[&_th]:p-2 [&_th]:text-left [&_th]:font-medium [&_th]:text-muted-foreground">
                  <th>Canal</th>
                  <th className="text-right">Leads</th>
                  <th className="text-right">Matrículas</th>
                  <th className="text-right">Conversão</th>
                  <th className="text-right">CPL</th>
                  <th className="text-right">Crescimento</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {channelPerformance.map((channel, index) => (
                  <tr key={index} className={index % 2 === 0 ? "" : "bg-muted/50"}>
                    <td className="p-2 font-medium">{channel.name}</td>
                    <td className="p-2 text-right">{channel.leads}</td>
                    <td className="p-2 text-right">{channel.matriculas}</td>
                    <td className="p-2 text-right">{channel.conversao}%</td>
                    <td className="p-2 text-right">R$ {channel.cpl.toFixed(2).replace('.', ',')}</td>
                    <td className="p-2 text-right">
                      <span className={channel.crescimento > 0 ? "text-green-600" : "text-red-600"}>
                        {channel.crescimento > 0 ? "+" : ""}{channel.crescimento}%
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-muted/20 font-semibold">
                  <td className="p-2">Total</td>
                  <td className="p-2 text-right">539</td>
                  <td className="p-2 text-right">108</td>
                  <td className="p-2 text-right">20.0%</td>
                  <td className="p-2 text-right">R$ 45,27</td>
                  <td className="p-2 text-right">+8.9%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelsTabContent;
