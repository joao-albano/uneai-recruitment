
import React, { memo } from 'react';
import LeadsTableView from '../LeadsTableView';

interface TableTabContentProps {
  filteredLeads: any[];
  onViewLead: (e: React.MouseEvent, leadId: number) => void;
  onEditLead: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead: (e: React.MouseEvent, leadId: number) => void;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const TableTabContent: React.FC<TableTabContentProps> = ({
  filteredLeads,
  onViewLead,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead,
  currentPage,
  itemsPerPage,
  onPageChange
}) => {
  return (
    <LeadsTableView 
      leads={filteredLeads} 
      onViewLead={onViewLead}
      onEditLead={onEditLead}
      onChangeStage={onChangeStage}
      onViewHistory={onViewHistory}
      onDeleteLead={onDeleteLead}
      page={currentPage}
      itemsPerPage={itemsPerPage}
      onPageChange={onPageChange}
    />
  );
};

export default memo(TableTabContent);
