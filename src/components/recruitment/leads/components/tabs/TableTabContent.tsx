
import React, { memo } from 'react';
import LeadsTableView from '../LeadsTableView';

interface TableTabContentProps {
  filteredLeads: any[];
  onEditLead: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead: (e: React.MouseEvent, leadId: number) => void;
}

const TableTabContent: React.FC<TableTabContentProps> = ({
  filteredLeads,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead
}) => {
  return (
    <LeadsTableView 
      leads={filteredLeads} 
      onEditLead={onEditLead}
      onChangeStage={onChangeStage}
      onViewHistory={onViewHistory}
      onDeleteLead={onDeleteLead}
    />
  );
};

export default memo(TableTabContent);
