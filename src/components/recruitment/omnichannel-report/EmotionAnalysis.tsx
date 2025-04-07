
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid 
} from 'recharts';
import { OmnichannelReportData } from './data/types';

interface EmotionAnalysisProps {
  data: OmnichannelReportData;
  dateRange: '7d' | '30d' | '90d' | 'all';
}

const EmotionAnalysis: React.FC<EmotionAnalysisProps> = ({ data, dateRange }) => {
  const emotionColors = {
    positiva: "#2ecc71",
    neutra: "#f39c12",
    negativa: "#e74c3c"
  };
  
  const emotionPieData = [
    { name: 'Positiva', value: data.emotionDistribution.positive },
    { name: 'Neutra', value: data.emotionDistribution.neutral },
    { name: 'Negativa', value: data.emotionDistribution.negative }
  ];
  
  const EMOTION_COLORS = ['#2ecc71', '#f39c12', '#e74c3c'];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Emoções</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emotionPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {emotionPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={EMOTION_COLORS[index % EMOTION_COLORS.length]} />
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
            <CardTitle>Emoções por Canal</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.emotionsByChannel}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="channel" />
                <YAxis label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="positive" name="Positiva" fill="#2ecc71" />
                <Bar dataKey="neutral" name="Neutra" fill="#f39c12" />
                <Bar dataKey="negative" name="Negativa" fill="#e74c3c" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Emoções</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.emotionTrend}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Line type="monotone" dataKey="positive" name="Positiva" stroke="#2ecc71" />
                <Line type="monotone" dataKey="neutral" name="Neutra" stroke="#f39c12" />
                <Line type="monotone" dataKey="negative" name="Negativa" stroke="#e74c3c" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Impacto das Emoções na Resolução</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.emotionImpact}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="emotion" />
                <YAxis label={{ value: 'Valor', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="resolutionRate" name="Taxa de Resolução (%)" fill="#3498db" />
                <Bar dataKey="avgInteractionTime" name="Tempo Médio (min)" fill="#9b59b6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Principais Gatilhos Emocionais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-green-600 mb-2">Emoções Positivas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data.emotionalTriggers.positive.map((trigger, index) => (
                  <div key={index} className="p-2 border rounded-md border-green-200 bg-green-50">
                    <p className="text-sm">{trigger}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-amber-600 mb-2">Emoções Neutras</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data.emotionalTriggers.neutral.map((trigger, index) => (
                  <div key={index} className="p-2 border rounded-md border-amber-200 bg-amber-50">
                    <p className="text-sm">{trigger}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-red-600 mb-2">Emoções Negativas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data.emotionalTriggers.negative.map((trigger, index) => (
                  <div key={index} className="p-2 border rounded-md border-red-200 bg-red-50">
                    <p className="text-sm">{trigger}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionAnalysis;
