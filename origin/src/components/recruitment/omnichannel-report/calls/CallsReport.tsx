
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Bot, Phone, User } from 'lucide-react';

interface CallsReportProps {
  dateRange: '7d' | '30d' | '90d' | 'all';
}

// Dados mockados para o relatório de discagens humanas
const mockHumanCallsData = [
  { status: 'Atendida', count: 320, percentage: 45, trend: '+8%' },
  { status: 'Não Atendida', count: 210, percentage: 30, trend: '-5%' },
  { status: 'Caixa Postal', count: 120, percentage: 17, trend: '+2%' },
  { status: 'Transferida', count: 45, percentage: 6, trend: '+12%' },
  { status: 'Número Inválido', count: 15, percentage: 2, trend: '-10%' }
];

// Dados mockados para o relatório de discagens automáticas (IA)
const mockAICallsData = [
  { status: 'Atendida', count: 580, percentage: 48, trend: '+15%' },
  { status: 'Não Atendida', count: 320, percentage: 27, trend: '-2%' },
  { status: 'Caixa Postal', count: 210, percentage: 18, trend: '+3%' },
  { status: 'Transferida', count: 65, percentage: 5, trend: '+20%' },
  { status: 'Número Inválido', count: 25, percentage: 2, trend: '-5%' }
];

const COLORS = ['#4CAF50', '#FFC107', '#F44336', '#2196F3', '#9C27B0', '#607D8B'];

const CallsReport: React.FC<CallsReportProps> = ({ dateRange }) => {
  const [tabType, setTabType] = useState<'human' | 'ai'>('human');
  
  const callsData = tabType === 'human' ? mockHumanCallsData : mockAICallsData;
  
  const totalCalls = callsData.reduce((sum, item) => sum + item.count, 0);
  const successRate = callsData.find(item => item.status === 'Atendida')?.percentage || 0;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center md:space-x-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">Relatório de Discagens</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={tabType} onValueChange={(value) => setTabType(value as 'human' | 'ai')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="human" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <Phone className="h-4 w-4" />
                  <span>Discagens Humanas</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <Phone className="h-4 w-4" />
                  <span>Discagens Automáticas (IA)</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-medium">Total de Discagens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalCalls}</div>
                    <p className="text-xs text-muted-foreground">
                      {tabType === 'human' ? 'Realizadas por atendentes' : 'Realizadas automaticamente'}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-medium">Taxa de Atendimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{successRate}%</div>
                    <p className="text-xs text-muted-foreground">
                      Chamadas atendidas pelo destinatário
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-medium">Média por Dia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Math.round(totalCalls / (dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Baseado nos últimos {dateRange === '7d' ? '7 dias' : dateRange === '30d' ? '30 dias' : '90 dias'}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <TabsContent value="human" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Distribuição de Status (Discagens Humanas)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={mockHumanCallsData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="status"
                          >
                            {mockHumanCallsData.map((entry, index) => (
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
                      <CardTitle className="text-sm font-medium">Comparativo por Status</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={mockHumanCallsData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="status" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="count" name="Quantidade" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Detalhamento das Discagens Humanas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Status</TableHead>
                          <TableHead className="text-right">Quantidade</TableHead>
                          <TableHead className="text-right">Percentual</TableHead>
                          <TableHead className="text-right">Tendência</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockHumanCallsData.map((item) => (
                          <TableRow key={item.status}>
                            <TableCell className="font-medium">{item.status}</TableCell>
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
                          <TableCell className="font-bold">Total</TableCell>
                          <TableCell className="text-right font-bold">{totalCalls}</TableCell>
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
                      <CardTitle className="text-sm font-medium">Distribuição de Status (Discagens IA)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={mockAICallsData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="status"
                          >
                            {mockAICallsData.map((entry, index) => (
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
                      <CardTitle className="text-sm font-medium">Comparativo por Status</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={mockAICallsData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="status" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="count" name="Quantidade" fill="#10B981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Detalhamento das Discagens Automáticas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Status</TableHead>
                          <TableHead className="text-right">Quantidade</TableHead>
                          <TableHead className="text-right">Percentual</TableHead>
                          <TableHead className="text-right">Tendência</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockAICallsData.map((item) => (
                          <TableRow key={item.status}>
                            <TableCell className="font-medium">{item.status}</TableCell>
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
                          <TableCell className="font-bold">Total</TableCell>
                          <TableCell className="text-right font-bold">{totalCalls}</TableCell>
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

export default CallsReport;
