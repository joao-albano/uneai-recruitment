
import React, { memo } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import TableTabContent from '../tabs/TableTabContent';
import KanbanTabContent from '../tabs/KanbanTabContent';

interface LeadsTabsContentProps {
  viewMode: 'table' | 'kanban';
  filteredLeads: any[];
  stageGroups: any;
  onEditLead: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead: (e: React.MouseEvent, leadId: number) => void;
  onStageChange: (leadId: number, newStage: string, notes?: string) => void;
  openChangeStageDialog?: (leadId: number) => void;
}

const LeadsTabsContent: React.FC<LeadsTabsContentProps> = ({
  viewMode,
  filteredLeads,
  stageGroups,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead,
  onStageChange,
  openChangeStageDialog,
}) => {
  return (
    <Tabs value={viewMode} className="mt-4">
      <TabsContent value="table">
        <TableTabContent
          filteredLeads={filteredLeads}
          onEditLead={onEditLead}
          onChangeStage={onChangeStage}
          onViewHistory={onViewHistory}
          onDeleteLead={onDeleteLead}
        />
      </TabsContent>
      
      <TabsContent value="kanban">
        <KanbanTabContent
          stageGroups={stageGroups}
          onEditLead={onEditLead}
          onStageChange={onStageChange}
          onChangeStage={onChangeStage} 
          openChangeStageDialog={openChangeStageDialog}
          onViewHistory={onViewHistory}
          onDeleteLead={onDeleteLead}
        />
      </TabsContent>
    </Tabs>
  );
};

export default memo(LeadsTabsContent);
