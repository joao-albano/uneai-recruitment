
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, Search, Filter, Download, ChevronDown, 
  Plus, ListFilter, Trash2, MoreHorizontal 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import LeadCreateDialog from './LeadCreateDialog';

const LeadsManagement: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  
  // Colunas para a tabela de leads
  const columns = [
    {
      header: "Nome",
      accessorKey: "name",
      cell: (row: any) => (
        <div className="font-medium">{row.name}</div>
      )
    },
    {
      header: "Curso de Interesse",
      accessorKey: "course",
    },
    {
      header: "Filhos",
      accessorKey: "children",
      cell: (row: any) => (
        <div className="text-center">{row.children}</div>
      )
    },
    {
      header: "Canal",
      accessorKey: "channel",
      cell: (row: any) => (
        <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
          {row.channel}
        </Badge>
      )
    },
    {
      header: "Etapa",
      accessorKey: "stage",
      cell: (row: any) => (
        <Badge className={
          row.stage === "Contato Inicial" 
            ? "bg-blue-500" 
            : row.stage === "Agendamento" 
              ? "bg-amber-500" 
              : row.stage === "Visita" 
                ? "bg-purple-500" 
                : "bg-green-500"
        }>
          {row.stage}
        </Badge>
      )
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: any) => (
        <Badge className={
          row.status === "Novo" 
            ? "bg-green-500" 
            : row.status === "Em Andamento" 
              ? "bg-blue-500" 
              : row.status === "Aguardando" 
                ? "bg-amber-500" 
                : "bg-gray-500"
        }>
          {row.status}
        </Badge>
      )
    },
    {
      header: "Data de Cadastro",
      accessorKey: "createdAt",
    },
    {
      header: "Ações",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar Lead</DropdownMenuItem>
            <DropdownMenuItem>Alterar Etapa</DropdownMenuItem>
            <DropdownMenuItem>Ver Histórico</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Excluir Lead
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  ];
  
  // Dados fictícios para a tabela
  const mockData = [
    { id: 1, name: "João Silva", course: "Ensino Fundamental", children: 2, channel: "Site", stage: "Contato Inicial", status: "Novo", createdAt: "22/11/2023" },
    { id: 2, name: "Maria Santos", course: "Educação Infantil", children: 1, channel: "Facebook", stage: "Agendamento", status: "Em Andamento", createdAt: "21/11/2023" },
    { id: 3, name: "Pedro Oliveira", course: "Ensino Médio", children: 3, channel: "Indicação", stage: "Visita", status: "Aguardando", createdAt: "20/11/2023" },
    { id: 4, name: "Ana Rodrigues", course: "Ensino Fundamental", children: 2, channel: "Instagram", stage: "Matrícula", status: "Finalizado", createdAt: "19/11/2023" },
    { id: 5, name: "Lucas Martins", course: "Ensino Médio", children: 1, channel: "Google", stage: "Contato Inicial", status: "Novo", createdAt: "18/11/2023" },
  ];
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Leads</h1>
          <p className="text-muted-foreground">
            Cadastro, perfilamento e acompanhamento de leads
          </p>
        </div>
        <Button 
          onClick={() => setOpenDialog(true)}
          className="gap-2"
        >
          <UserPlus className="h-4 w-4" />
          <span>Novo Lead</span>
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Todos os Leads</TabsTrigger>
          <TabsTrigger value="new">Novos</TabsTrigger>
          <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
          <TabsTrigger value="scheduled">Agendados</TabsTrigger>
          <TabsTrigger value="enrolled">Matriculados</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar lead..."
                  className="pl-8 w-full"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-2 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <ListFilter className="h-4 w-4" />
                    <span>Filtros</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Canal</DropdownMenuItem>
                  <DropdownMenuItem>Curso</DropdownMenuItem>
                  <DropdownMenuItem>Etapa</DropdownMenuItem>
                  <DropdownMenuItem>Status</DropdownMenuItem>
                  <DropdownMenuItem>Data</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable 
            data={mockData} 
            columns={columns} 
          />
        </CardContent>
      </Card>
      
      <LeadCreateDialog open={openDialog} onOpenChange={setOpenDialog} />
    </div>
  );
};

export default LeadsManagement;
