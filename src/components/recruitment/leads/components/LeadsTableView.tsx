
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

interface LeadsTableViewProps {
  leads: any[];
  onEditLead?: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage?: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory?: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead?: (e: React.MouseEvent, leadId: number) => void;
}

const LeadsTableView: React.FC<LeadsTableViewProps> = ({ 
  leads,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100/80';
      case 'Em Andamento':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100/80';
      case 'Aguardando':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100/80';
      case 'Finalizado':
        return 'bg-green-100 text-green-800 hover:bg-green-100/80';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100/80';
    }
  };

  // Função para tratar eventos com prevenção de propagação
  const handleAction = (
    e: React.MouseEvent, 
    actionHandler?: (e: React.MouseEvent, leadId: number) => void, 
    leadId?: number
  ) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (actionHandler && leadId !== undefined) {
      actionHandler(e, leadId);
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Canal</TableHead>
            <TableHead>Etapa</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                Nenhum lead encontrado
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>{lead.course}</TableCell>
                <TableCell>{lead.channel}</TableCell>
                <TableCell>{lead.stage}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>{lead.createdAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {onEditLead && (
                        <DropdownMenuItem 
                          onClick={(e) => handleAction(e, onEditLead, lead.id)}
                          className="cursor-pointer"
                        >
                          Editar Lead
                        </DropdownMenuItem>
                      )}
                      {onChangeStage && (
                        <DropdownMenuItem 
                          onClick={(e) => handleAction(e, onChangeStage, lead.id)}
                          className="cursor-pointer"
                        >
                          Alterar Etapa
                        </DropdownMenuItem>
                      )}
                      {onViewHistory && (
                        <DropdownMenuItem 
                          onClick={(e) => handleAction(e, onViewHistory, lead.id)}
                          className="cursor-pointer"
                        >
                          Ver Histórico
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      {onDeleteLead && (
                        <DropdownMenuItem 
                          className="text-destructive cursor-pointer"
                          onClick={(e) => handleAction(e, onDeleteLead, lead.id)}
                        >
                          Excluir Lead
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadsTableView;
