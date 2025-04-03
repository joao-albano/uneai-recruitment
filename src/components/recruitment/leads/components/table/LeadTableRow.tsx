
import React, { memo } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import LeadActionMenu from './LeadActionMenu';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface LeadTableRowProps {
  lead: any;
  onEditLead?: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage?: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory?: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead?: (e: React.MouseEvent, leadId: number) => void;
  handleRowClick: (e: React.MouseEvent) => void;
}

const LeadTableRow: React.FC<LeadTableRowProps> = ({
  lead,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead,
  handleRowClick
}) => {
  // Status color utility
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'novo':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100/80';
      case 'em andamento':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100/80';
      case 'aguardando':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100/80';
      case 'finalizado':
        return 'bg-green-100 text-green-800 hover:bg-green-100/80';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100/80';
    }
  };

  // Format date consistently
  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return "Data inválida";
      
      // Parse the date - handle ISO strings or other date formats
      const date = typeof dateString === 'string' 
        ? dateString.includes('T') 
          ? parseISO(dateString) 
          : new Date(dateString)
        : new Date(dateString);
      
      if (isNaN(date.getTime())) {
        console.error("Invalid date detected:", dateString);
        return "Data inválida";
      }
      
      return format(date, 'dd/MM/yyyy', { locale: ptBR });
    } catch (e) {
      console.error("Error formatting date:", e, "dateString:", dateString);
      return "Data inválida";
    }
  };

  // Prevent row clicks from interfering with action menu
  const handleCellClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <TableRow key={lead.id} onClick={handleRowClick} className="hover:bg-muted/40 transition-colors">
      <TableCell className="font-medium">{lead.name}</TableCell>
      <TableCell>{lead.course}</TableCell>
      <TableCell className="hidden sm:table-cell">{lead.channel}</TableCell>
      <TableCell>{lead.stage}</TableCell>
      <TableCell>
        <Badge className={getStatusColor(lead.status)}>
          {lead.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {formatDate(lead.createdAt)}
      </TableCell>
      <TableCell className="text-right" onClick={handleCellClick}>
        <LeadActionMenu
          leadId={lead.id}
          onEditLead={onEditLead}
          onChangeStage={onChangeStage}
          onViewHistory={onViewHistory}
          onDeleteLead={onDeleteLead}
        />
      </TableCell>
    </TableRow>
  );
};

export default memo(LeadTableRow);
