
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Bot, User } from 'lucide-react';

interface RegistryReportProps {
  dateRange: '7d' | '30d' | '90d' | 'all';
}

// Dados mockados para o relatório de tabulação
const mockHumanRegistryData = [
  { code: 'INT', description: 'Interessado', count: 145, percentage: 35, trend: '+12%' },
  { code: 'AGD', description: 'Agendado', count: 98, percentage: 23, trend: '+5%' },
  { code: 'DSI', description: 'Desinteressado', count: 78, percentage: 19, trend: '-3%' },
  { code: 'NQA', description: 'Não qualificado', count: 65, percentage: 15, trend: '+2%' },
  { code: 'MAT', description: 'Matriculado', count: 35, percentage: 8, trend: '+15%' }
];

const mockAIRegistryData = [
  { code: 'INT', description: 'Interessado', count: 230, percentage: 40, trend: '+18%' },
  { code: 'INF', description: 'Pediu informações', count: 155, percentage: 27, trend: '+10%' },
  { code: 'DSI', description: 'Desinteressado', count: 95, percentage: 17, trend: '-5%' },
  { code: 'NQA', description: 'Não qualificado', count: 75, percentage: 13, trend: '+1%' },
  { code: 'DUV', description: 'Com dúvidas', count: 20, percentage: 3, trend: '-2%' }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const RegistryReport: React.FC<RegistryReportProps> = ({ dateRange }) => {
  const [tabType, setTabType] = useState<'human' | 'ai'>('human');
  
  const registryData = tabType === 'human' ? mockHumanRegistryData : mockAIRegistryData;
  
  const totalRegistries = registryData.reduce((sum, item) => sum + item.count, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center md:space-x-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">Relatório de Tabulações</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={tabType} onValueChange={(value) => setTabType(value as 'human' | 'ai')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="human" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Tabulação Humana</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <span>Tabulação IA</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="human" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Distribuição de Tabulações Humanas</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={mockHumanRegistryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="description"
                          >
                            {mockHumanRegistryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Comparativo de Tabulações</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={mockHumanRegistryData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="description" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="count" name="Quantidade" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Detalhamento das Tabulações Humanas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Código</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead className="text-right">Quantidade</TableHead>
                          <TableHead className="text-right">Percentual</TableHead>
                          <TableHead className="text-right">Tendência</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockHumanRegistryData.map((item) => (
                          <TableRow key={item.code}>
                            <TableCell className="font-medium">{item.code}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell className="text-right">{item.count}</TableCell>
                            <TableCell className="text-right">{item.percentage}%</TableCell>
                            <TableCell className="text-right">
                              <Badge variant={item.trend.startsWith('+') ? 'default' : 'destructive'}>
                                {item.trend}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/50">
                          <TableCell colSpan={2} className="font-bold">Total</TableCell>
                          <TableCell className="text-right font-bold">{totalRegistries}</TableCell>
                          <TableCell className="text-right font-bold">100%</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="ai" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Distribuição de Tabulações IA</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={mockAIRegistryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="description"
                          >
                            {mockAIRegistryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Comparativo de Tabulações</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={mockAIRegistryData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="description" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="count" name="Quantidade" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Detalhamento das Tabulações IA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Código</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead className="text-right">Quantidade</TableHead>
                          <TableHead className="text-right">Percentual</TableHead>
                          <TableHead className="text-right">Tendência</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockAIRegistryData.map((item) => (
                          <TableRow key={item.code}>
                            <TableCell className="font-medium">{item.code}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell className="text-right">{item.count}</TableCell>
                            <TableCell className="text-right">{item.percentage}%</TableCell>
                            <TableCell className="text-right">
                              <Badge variant={item.trend.startsWith('+') ? 'default' : 'destructive'}>
                                {item.trend}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/50">
                          <TableCell colSpan={2} className="font-bold">Total</TableCell>
                          <TableCell className="text-right font-bold">{totalRegistries}</TableCell>
                          <TableCell className="text-right font-bold">100%</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistryReport;
