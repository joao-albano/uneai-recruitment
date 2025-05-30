
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ApiItem {
  id: string;
  name: string;
  endpoint: string;
  type: 'rest' | 'webhook' | 'external';
  status: 'active' | 'inactive';
  organization: string;
  lastUsed: string;
  totalCalls: number;
}

const demoApis: ApiItem[] = [
  { 
    id: '1', 
    name: 'WhatsApp Integration', 
    endpoint: '/api/whatsapp/webhook', 
    type: 'webhook',
    status: 'active',
    organization: 'Escola Central',
    lastUsed: '2023-06-15',
    totalCalls: 3452
  },
  { 
    id: '2', 
    name: 'Student Data API', 
    endpoint: '/api/students', 
    type: 'rest',
    status: 'active',
    organization: 'Escola Norte',
    lastUsed: '2023-06-14',
    totalCalls: 8921
  },
  { 
    id: '3', 
    name: 'Payment Integration', 
    endpoint: '/api/payments/callback', 
    type: 'webhook',
    status: 'inactive',
    organization: 'Escola Sul',
    lastUsed: '2023-05-21',
    totalCalls: 543
  },
  { 
    id: '4', 
    name: 'OpenAI Chat', 
    endpoint: 'https://api.openai.com/v1/chat', 
    type: 'external',
    status: 'active',
    organization: 'UNE CX',
    lastUsed: '2023-06-15',
    totalCalls: 12453
  },
  { 
    id: '5', 
    name: 'Email Service', 
    endpoint: '/api/email', 
    type: 'rest',
    status: 'active',
    organization: 'Escola Oeste',
    lastUsed: '2023-06-13',
    totalCalls: 1253
  },
];

const AdminApisReportContent: React.FC = () => {
  const { language } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const filteredApis = demoApis.filter(api => 
    (api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     api.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
     api.organization.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'all' || api.type === activeTab)
  );
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'rest': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'webhook': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'external': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {language === 'pt-BR' ? 'Relatório de APIs' : 'API Report'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === 'pt-BR' 
            ? 'Visão geral de todas as APIs criadas e utilizadas no sistema' 
            : 'Overview of all APIs created and used in the system'}
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar APIs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button variant="outline" className="w-full md:w-auto">
          <Download className="mr-2 h-4 w-4" />
          {language === 'pt-BR' ? 'Exportar Relatório' : 'Export Report'}
        </Button>
      </div>
      
      <Tabs 
        defaultValue="all" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="rest">REST</TabsTrigger>
          <TabsTrigger value="webhook">Webhooks</TabsTrigger>
          <TabsTrigger value="external">Externos</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{language === 'pt-BR' ? 'APIs do Sistema' : 'System APIs'}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Organização</TableHead>
                    <TableHead>Último Uso</TableHead>
                    <TableHead>Total Chamadas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApis.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        {language === 'pt-BR' ? 'Nenhuma API encontrada' : 'No APIs found'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApis.map((api) => (
                      <TableRow key={api.id}>
                        <TableCell className="font-medium">{api.name}</TableCell>
                        <TableCell className="font-mono text-xs">{api.endpoint}</TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(api.type)} variant="outline">
                            {api.type.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(api.status)}>
                            {api.status === 'active' ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </TableCell>
                        <TableCell>{api.organization}</TableCell>
                        <TableCell>{api.lastUsed}</TableCell>
                        <TableCell className="text-right">{api.totalCalls.toLocaleString()}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminApisReportContent;
