
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, BarChart, LineChart, ResponsiveContainer, Pie, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { leadsData } from '../data/analyticsData';

const LeadsTab: React.FC = () => {
  // Cores para gráficos de pizza
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#8DD1E1'];

  return (
    <div className="space-y-6">
      {/* Cards Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {leadsData.leadsByStatus.reduce((sum, item) => sum + item.count, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leads Qualificados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {leadsData.leadsByStatus.find(item => item.status === 'Qualificado')?.count || 0}
            </div>
            <Progress 
              value={leadsData.leadsByStatus.find(item => item.status === 'Qualificado')?.percentage || 0} 
              className="h-2 mt-2" 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lead de Alta Qualidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{leadsData.leadQuality.excellent}</div>
            <Progress 
              value={(leadsData.leadQuality.excellent / (leadsData.leadQuality.excellent + leadsData.leadQuality.good + leadsData.leadQuality.average + leadsData.leadQuality.poor)) * 100} 
              className="h-2 mt-2 bg-green-500" 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leads Agendados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {leadsData.leadsByStatus.find(item => item.status === 'Agendado')?.count || 0}
            </div>
            <Progress 
              value={leadsData.leadsByStatus.find(item => item.status === 'Agendado')?.percentage || 0} 
              className="h-2 mt-2 bg-amber-500" 
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Gráficos de distribuição */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Leads por Status</CardTitle>
            <CardDescription>Distribuição de leads por etapa no processo</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadsData.leadsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="status"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {leadsData.leadsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} leads`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Leads por Origem</CardTitle>
            <CardDescription>Distribuição de leads por canal de captação</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadsData.leadsBySource}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} leads`, 'Quantidade']} />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Leads" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Mais gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Leads por Curso</CardTitle>
            <CardDescription>Distribuição de leads por curso de interesse</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadsData.leadsByCourse}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="course"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {leadsData.leadsByCourse.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} leads`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Leads</CardTitle>
            <CardDescription>Volume de leads captados por mês</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadsData.leadTimeSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} leads`, 'Quantidade']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8884d8"
                  name="Leads" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Qualidade de Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Qualidade dos Leads</CardTitle>
          <CardDescription>Distribuição dos leads por nível de qualidade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-green-800 text-lg font-semibold mb-1">Excelente</div>
              <div className="text-3xl font-bold text-green-700">{leadsData.leadQuality.excellent}</div>
              <Progress 
                value={(leadsData.leadQuality.excellent / (leadsData.leadQuality.excellent + leadsData.leadQuality.good + leadsData.leadQuality.average + leadsData.leadQuality.poor)) * 100} 
                className="h-2 mt-2 bg-green-500" 
              />
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-blue-800 text-lg font-semibold mb-1">Bom</div>
              <div className="text-3xl font-bold text-blue-700">{leadsData.leadQuality.good}</div>
              <Progress 
                value={(leadsData.leadQuality.good / (leadsData.leadQuality.excellent + leadsData.leadQuality.good + leadsData.leadQuality.average + leadsData.leadQuality.poor)) * 100} 
                className="h-2 mt-2 bg-blue-500" 
              />
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="text-amber-800 text-lg font-semibold mb-1">Médio</div>
              <div className="text-3xl font-bold text-amber-700">{leadsData.leadQuality.average}</div>
              <Progress 
                value={(leadsData.leadQuality.average / (leadsData.leadQuality.excellent + leadsData.leadQuality.good + leadsData.leadQuality.average + leadsData.leadQuality.poor)) * 100} 
                className="h-2 mt-2 bg-amber-500" 
              />
            </div>
            
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-red-800 text-lg font-semibold mb-1">Baixo</div>
              <div className="text-3xl font-bold text-red-700">{leadsData.leadQuality.poor}</div>
              <Progress 
                value={(leadsData.leadQuality.poor / (leadsData.leadQuality.excellent + leadsData.leadQuality.good + leadsData.leadQuality.average + leadsData.leadQuality.poor)) * 100} 
                className="h-2 mt-2 bg-red-500" 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsTab;
