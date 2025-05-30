
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts';
import { OmnichannelReportData } from './data/types';

interface InteractionInsightsProps {
  data: OmnichannelReportData;
  dateRange: '7d' | '30d' | '90d' | 'all';
}

const InteractionInsights: React.FC<InteractionInsightsProps> = ({ data, dateRange }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Horários de Pico</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.peakHours}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="whatsapp" name="WhatsApp" fill="#25D366" />
                <Bar dataKey="email" name="Email" fill="#DB4437" />
                <Bar dataKey="phone" name="Telefone" fill="#4285F4" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Principais Assuntos</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data.topTopics}
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="topic" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Quantidade" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Conversão por Canal</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.conversionByChannel}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="channel" />
                <YAxis label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="rate" name="Taxa de Conversão" fill="#9b59b6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Eficiência ao Longo do Tempo</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.efficiencyTrend}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="responseTime" name="Tempo de Resposta (min)" stroke="#3498db" />
                <Line type="monotone" dataKey="resolutionRate" name="Taxa de Resolução (%)" stroke="#2ecc71" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Insights e Recomendações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recommendations.map((rec, index) => (
              <div key={index} className="border p-4 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{rec.title}</h3>
                  <Badge variant={rec.priority === 'alta' ? 'destructive' : rec.priority === 'média' ? 'default' : 'outline'}>
                    Prioridade {rec.priority}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">{rec.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Ações recomendadas:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {rec.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="text-sm">{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractionInsights;
