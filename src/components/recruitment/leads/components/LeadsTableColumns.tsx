
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const getLeadColumns = () => [
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

export default getLeadColumns;
