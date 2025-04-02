
import React, { memo, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import LeadTableRow from './table/LeadTableRow';
import EmptyLeadsState from './table/EmptyLeadsState';

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
  // Handler to prevent propagation on row clicks
  const handleRowClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
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
            <EmptyLeadsState />
          ) : (
            leads.map((lead) => (
              <LeadTableRow 
                key={lead.id}
                lead={lead}
                onEditLead={onEditLead}
                onChangeStage={onChangeStage}
                onViewHistory={onViewHistory}
                onDeleteLead={onDeleteLead}
                handleRowClick={handleRowClick}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default memo(LeadsTableView);
