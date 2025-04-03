
import React, { memo, useCallback, useMemo } from 'react';
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
import LeadsPagination from './LeadsPagination';

interface LeadsTableViewProps {
  leads: any[];
  onViewLead?: (e: React.MouseEvent, leadId: number) => void;
  onEditLead?: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage?: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory?: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead?: (e: React.MouseEvent, leadId: number) => void;
  page: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const LeadsTableView: React.FC<LeadsTableViewProps> = ({ 
  leads,
  onViewLead,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead,
  page,
  itemsPerPage,
  onPageChange
}) => {
  // Handler to prevent propagation on row clicks
  const handleRowClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Calculate pagination
  const paginatedLeads = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return leads.slice(startIndex, startIndex + itemsPerPage);
  }, [leads, page, itemsPerPage]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(leads.length / itemsPerPage);
  }, [leads.length, itemsPerPage]);

  // Calculate the starting number for the current page
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + paginatedLeads.length - 1, leads.length);

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
            paginatedLeads.map((lead) => (
              <LeadTableRow 
                key={lead.id}
                lead={lead}
                onViewLead={onViewLead}
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

      {leads.length > 0 && (
        <div className="flex flex-col items-center px-4 py-2 border-t">
          <LeadsPagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={onPageChange} 
          />
          <p className="text-sm text-muted-foreground mt-1">
            Mostrando {startItem} a {endItem} de {leads.length} leads
          </p>
        </div>
      )}
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default memo(LeadsTableView);
