
import React, { memo, useCallback } from 'react';
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

  // Enhanced action handler with proper event propagation control
  const handleAction = useCallback(
    (e: React.MouseEvent, actionHandler?: (e: React.MouseEvent, leadId: number) => void, leadId?: number) => {
      // Always stop propagation and prevent default
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      // Call the handler if provided
      if (actionHandler && leadId !== undefined) {
        actionHandler(e, leadId);
      }
    }, 
    []
  );

  // Handler to prevent propagation on row clicks
  const handleRowClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Enhanced dropdown click handler
  const handleDropdownClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Menu item click handler to ensure proper event control
  const handleMenuItemClick = useCallback((
    e: React.MouseEvent, 
    handler?: (e: React.MouseEvent, leadId: number) => void, 
    leadId?: number
  ) => {
    // Stop all event propagation
    e.preventDefault();
    e.stopPropagation();
    
    if (handler && leadId !== undefined) {
      // Execute the action after a tiny delay to ensure UI responsiveness
      setTimeout(() => {
        handler(e, leadId);
      }, 10);
    }
  }, []);

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead className="hidden sm:table-cell">Canal</TableHead>
            <TableHead>Etapa</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Data</TableHead>
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
              <TableRow key={lead.id} onClick={handleRowClick}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>{lead.course}</TableCell>
                <TableCell className="hidden sm:table-cell">{lead.channel}</TableCell>
                <TableCell>{lead.stage}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{lead.createdAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        type="button"
                        onClick={handleDropdownClick}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="bg-white z-50"
                      onClick={handleDropdownClick}
                      onPointerDownOutside={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {onEditLead && (
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={(e) => handleMenuItemClick(e, onEditLead, lead.id)}
                          onSelect={(e) => e.preventDefault()}
                        >
                          Editar Lead
                        </DropdownMenuItem>
                      )}
                      {onChangeStage && (
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={(e) => handleMenuItemClick(e, onChangeStage, lead.id)}
                          onSelect={(e) => e.preventDefault()}
                        >
                          Alterar Etapa
                        </DropdownMenuItem>
                      )}
                      {onViewHistory && (
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={(e) => handleMenuItemClick(e, onViewHistory, lead.id)}
                          onSelect={(e) => e.preventDefault()}
                        >
                          Ver Histórico
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      {onDeleteLead && (
                        <DropdownMenuItem 
                          className="text-destructive cursor-pointer"
                          onClick={(e) => handleMenuItemClick(e, onDeleteLead, lead.id)}
                          onSelect={(e) => e.preventDefault()}
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

// Use React.memo to prevent unnecessary re-renders
export default memo(LeadsTableView);
