
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid 
} from 'recharts';
import { OmnichannelReportData } from './data/types';

interface ChannelPerformanceProps {
  data: OmnichannelReportData;
  dateRange: '7d' | '30d' | '90d' | 'all';
}

const ChannelPerformance: React.FC<ChannelPerformanceProps> = ({ data, dateRange }) => {
  // Em uma implementação real, filtraria baseado no intervalo de datas
  
  const channelColors = {
    whatsapp: "#25D366",
    email: "#DB4437",
    phone: "#4285F4"
  };
  
  const pieData = [
    { name: 'WhatsApp', value: data.channelDistribution.whatsapp },
    { name: 'Email', value: data.channelDistribution.email },
    { name: 'Telefone', value: data.channelDistribution.phone }
  ];
  
  const COLORS = ['#25D366', '#DB4437', '#4285F4'];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Atendimentos</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tempo de Resposta por Canal</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.responseTimeByChannel}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Minutos', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `${value} min`} />
                <Legend />
                <Bar dataKey="avgTime" name="Tempo Médio (min)" fill="#4285F4" />
                <Bar dataKey="firstResponseTime" name="Primeira Resposta (min)" fill="#34A853" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Eficiência de Resolução</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.resolutionByChannel}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="resolutionRate" name="Taxa de Resolução" fill="#FBBC05" />
                <Bar dataKey="satisfactionRate" name="Satisfação" fill="#EA4335" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Volume de Atendimentos por Dia</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.dailyVolume}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="whatsapp" name="WhatsApp" stroke="#25D366" />
                <Line type="monotone" dataKey="email" name="Email" stroke="#DB4437" />
                <Line type="monotone" dataKey="phone" name="Telefone" stroke="#4285F4" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Métricas de Desempenho Detalhadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">Canal</th>
                  <th className="border p-2 text-center">Atendimentos</th>
                  <th className="border p-2 text-center">Tempo Médio</th>
                  <th className="border p-2 text-center">1ª Resposta</th>
                  <th className="border p-2 text-center">Resolução</th>
                  <th className="border p-2 text-center">Satisfação</th>
                  <th className="border p-2 text-center">Transferências</th>
                </tr>
              </thead>
              <tbody>
                {data.channelMetrics.map((channel, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-muted/30'}>
                    <td className="border p-2">{channel.name}</td>
                    <td className="border p-2 text-center">{channel.interactions}</td>
                    <td className="border p-2 text-center">{channel.avgTime} min</td>
                    <td className="border p-2 text-center">{channel.firstResponseTime} min</td>
                    <td className="border p-2 text-center">{channel.resolutionRate}%</td>
                    <td className="border p-2 text-center">{channel.satisfactionRate}%</td>
                    <td className="border p-2 text-center">{channel.transferRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelPerformance;
