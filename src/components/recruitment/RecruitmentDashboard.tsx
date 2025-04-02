
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { UserPlus, ChevronRight, Filter, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RecruitmentStats from './dashboard/RecruitmentStats';
import FunnelChartComponent from './dashboard/FunnelChart';
import ChannelsTabContent from './dashboard/tabs/ChannelsTabContent';
import CoursesTabContent from './dashboard/tabs/CoursesTabContent';
import LocationsTabContent from './dashboard/tabs/LocationsTabContent';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const RecruitmentDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Dados de leads recentes
  const recentLeads = [{
    id: 1,
    name: 'Maria Oliveira',
    course: 'Ensino Fundamental I',
    channel: 'Site',
    time: '2h'
  }, {
    id: 2,
    name: 'Carlos Santos',
    course: 'Ensino Médio',
    channel: 'WhatsApp',
    time: '3h'
  }, {
    id: 3,
    name: 'Ana Paula Silva',
    course: 'Educação Infantil',
    channel: 'Facebook',
    time: '5h'
  }, {
    id: 4,
    name: 'Roberto Almeida',
    course: 'Ensino Fundamental II',
    channel: 'Instagram',
    time: '8h'
  }, {
    id: 5,
    name: 'Juliana Costa',
    course: 'Período Integral',
    channel: 'Indicação',
    time: '12h'
  }];
  return <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Captação de Alunos</h1>
          <p className="text-muted-foreground">
            Painel de controle e visualização operacional da captação
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={() => navigate('/recruitment/leads')}>
            <UserPlus className="h-4 w-4" />
            <span>Gerenciar Leads</span>
          </Button>
          <Button className="gap-2" onClick={() => navigate('/recruitment/funnel')}>
            <Filter className="h-4 w-4" />
            <span>Funil de Captação</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="channels">Canais</TabsTrigger>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="locations">Localidades</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="pt-4">
          <RecruitmentStats />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Funil de Captação</CardTitle>
                <CardDescription>
                  Visão geral do processo de captação
                </CardDescription>
              </CardHeader>
              <CardContent className="my-[14px] py-[27px] mx-0 px-[12px]">
                <div className="h-80">
                  <FunnelChartComponent />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">Leads Recentes</CardTitle>
                  <CardDescription>
                    Últimos contatos cadastrados
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/recruitment/leads')}>
                  <span>Ver Todos</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentLeads.map(lead => <div key={lead.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <UserPlus className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {lead.course} • Canal: {lead.channel}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">Há {lead.time}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="channels" className="pt-4">
          <ChannelsTabContent />
        </TabsContent>
        
        <TabsContent value="courses" className="pt-4">
          <CoursesTabContent />
        </TabsContent>
        
        <TabsContent value="locations" className="pt-4">
          <LocationsTabContent />
        </TabsContent>
      </Tabs>
      
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Visualização Operacional</CardTitle>
            <CardDescription>
              Leads cadastrados por etapa no funil
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Exportar CSV</span>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Etapa</TableHead>
                <TableHead className="text-right w-[100px]">Leads</TableHead>
                <TableHead className="text-right w-[120px]">% do Total</TableHead>
                <TableHead className="text-right w-[200px]">Conversão p/ Próx. Etapa</TableHead>
                <TableHead className="text-right w-[120px]">Tempo Médio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Leads Gerados</TableCell>
                <TableCell className="text-right">539</TableCell>
                <TableCell className="text-right">100%</TableCell>
                <TableCell className="text-right">78.9%</TableCell>
                <TableCell className="text-right">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Contatos Realizados</TableCell>
                <TableCell className="text-right">425</TableCell>
                <TableCell className="text-right">78.9%</TableCell>
                <TableCell className="text-right">67.1%</TableCell>
                <TableCell className="text-right">2 dias</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Agendamento</TableCell>
                <TableCell className="text-right">285</TableCell>
                <TableCell className="text-right">52.9%</TableCell>
                <TableCell className="text-right">63.9%</TableCell>
                <TableCell className="text-right">5 dias</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Visita</TableCell>
                <TableCell className="text-right">182</TableCell>
                <TableCell className="text-right">33.8%</TableCell>
                <TableCell className="text-right">64.3%</TableCell>
                <TableCell className="text-right">3 dias</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Matrícula</TableCell>
                <TableCell className="text-right">117</TableCell>
                <TableCell className="text-right">21.7%</TableCell>
                <TableCell className="text-right">-</TableCell>
                <TableCell className="text-right">2 dias</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>;
};
export default RecruitmentDashboard;
