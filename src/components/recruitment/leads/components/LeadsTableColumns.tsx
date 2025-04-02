
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
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface GetLeadColumnsProps {
  onEditLead: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead: (e: React.MouseEvent, leadId: number) => void;
}

export const getLeadColumns = ({
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead
}: GetLeadColumnsProps) => [
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
    cell: (row: any) => {
      try {
        // Handle different possible date formats
        const dateValue = row.createdAt;
        let date: Date;
        
        if (typeof dateValue === 'string') {
          // Try to parse as ISO format first
          if (dateValue.includes('T')) {
            date = parseISO(dateValue);
          } else {
            // Try simple date format (YYYY-MM-DD)
            date = new Date(dateValue);
          }
        } else {
          date = new Date(dateValue);
        }
        
        return format(date, 'dd/MM/yyyy', { locale: ptBR });
      } catch (e) {
        console.error("Erro ao formatar data:", e, row.createdAt);
        return "Data inválida";
      }
    }
  },
  {
    header: "Ações",
    cell: (row: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={(e) => onEditLead(e, row.id)}
            className="cursor-pointer"
          >
            Editar Lead
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={(e) => onChangeStage(e, row.id)}
            className="cursor-pointer"
          >
            Alterar Etapa
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={(e) => onViewHistory(e, row.id)}
            className="cursor-pointer"
          >
            Ver Histórico
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-destructive cursor-pointer"
            onClick={(e) => onDeleteLead(e, row.id)}
          >
            Excluir Lead
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
];
