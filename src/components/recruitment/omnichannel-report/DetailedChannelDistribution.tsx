
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, PhoneCall, Mail, MessagesSquare, User, Robot } from 'lucide-react';
import { OmnichannelReportData } from './data/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from '@/components/ui/table';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  Cell, PieChart, Pie
} from 'recharts';

interface DetailedChannelDistributionProps {
  data: OmnichannelReportData;
  dateRange: '7d' | '30d' | '90d' | 'all';
}

const DetailedChannelDistribution: React.FC<DetailedChannelDistributionProps> = ({ data, dateRange }) => {
  // Preparar dados para gráficos
  const humanVsAiData = [
    {
      name: 'Atendimento Humano',
      value: data.detailedDistribution.phoneActive.human + 
        data.detailedDistribution.phoneReceptive.human + 
        data.detailedDistribution.whatsapp.human + 
        data.detailedDistribution.email.human
    },
    {
      name: 'Atendimento IA',
      value: data.detailedDistribution.phoneActive.ai + 
        data.detailedDistribution.phoneReceptive.ai + 
        data.detailedDistribution.whatsapp.ai + 
        data.detailedDistribution.email.ai
    }
  ];

  const channelComparisonData = [
    {
      name: 'Ligações Ativas',
      total: data.detailedDistribution.phoneActive.total,
      human: data.detailedDistribution.phoneActive.human,
      ai: data.detailedDistribution.phoneActive.ai
    },
    {
      name: 'Ligações Receptivas',
      total: data.detailedDistribution.phoneReceptive.total,
      human: data.detailedDistribution.phoneReceptive.human,
      ai: data.detailedDistribution.phoneReceptive.ai
    },
    {
      name: 'WhatsApp',
      total: data.detailedDistribution.whatsapp.total,
      human: data.detailedDistribution.whatsapp.human,
      ai: data.detailedDistribution.whatsapp.ai
    },
    {
      name: 'E-mail',
      total: data.detailedDistribution.email.total,
      human: data.detailedDistribution.email.human,
      ai: data.detailedDistribution.email.ai
    }
  ];

  const COLORS = ['#4CAF50', '#2196F3', '#FF9800', '#F44336'];
  const HUMAN_AI_COLORS = ['#4CAF50', '#2196F3'];

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Ligações Ativas':
        return <Phone className="h-5 w-5 text-blue-600" />;
      case 'Ligações Receptivas':
        return <PhoneCall className="h-5 w-5 text-green-600" />;
      case 'WhatsApp':
        return <MessagesSquare className="h-5 w-5 text-green-500" />;
      case 'E-mail':
        return <Mail className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição por Tipo de Atendimento</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={humanVsAiData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {humanVsAiData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={HUMAN_AI_COLORS[index % HUMAN_AI_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} atendimentos`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Comparativo por Canal</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={channelComparisonData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="human" name="Humano" stackId="a" fill="#4CAF50" />
                <Bar dataKey="ai" name="IA" stackId="a" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detalhamento de Canais (Humano vs IA)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Canal</TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>Humano</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center">
                      <Robot className="h-4 w-4 mr-1" />
                      <span>IA</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">% Humano</TableHead>
                  <TableHead className="text-center">% IA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {channelComparisonData.map((channel, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center">
                        {getChannelIcon(channel.name)}
                        <span className="ml-2">{channel.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{channel.human}</TableCell>
                    <TableCell className="text-center">{channel.ai}</TableCell>
                    <TableCell className="text-center font-medium">{channel.total}</TableCell>
                    <TableCell className="text-center">
                      {((channel.human / channel.total) * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-center">
                      {((channel.ai / channel.total) * 100).toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-medium">Total</TableCell>
                  <TableCell className="text-center font-medium">
                    {humanVsAiData[0].value}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {humanVsAiData[1].value}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {humanVsAiData[0].value + humanVsAiData[1].value}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {((humanVsAiData[0].value / (humanVsAiData[0].value + humanVsAiData[1].value)) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {((humanVsAiData[1].value / (humanVsAiData[0].value + humanVsAiData[1].value)) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedChannelDistribution;
