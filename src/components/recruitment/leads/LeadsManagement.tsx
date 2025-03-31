
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import LeadCreateDialog from './LeadCreateDialog';
import LeadsKanbanView from './LeadsKanbanView';
import LeadsHeader from './components/LeadsHeader';
import LeadsTabs from './components/LeadsTabs';
import LeadsToolbar from './components/LeadsToolbar';
import { getLeadColumns } from './components/LeadsTableColumns';
import { mockLeadsData, getLeadsByStage } from './data/mockLeadsData';

const LeadsManagement: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  
  const columns = getLeadColumns();
  const stageGroups = getLeadsByStage();

  const handleStageChange = (leadId: number, newStage: string) => {
    console.log(`Lead ${leadId} movido para etapa: ${newStage}`);
    // Aqui você implementaria a lógica para atualizar o estágio do lead no backend
  };
  
  return (
    <div className="container mx-auto py-6">
      <LeadsHeader onOpenDialog={() => setOpenDialog(true)} />
      <LeadsTabs />
      
      <Card>
        <CardHeader className="pb-3">
          <LeadsToolbar 
            viewMode={viewMode} 
            onViewModeChange={(mode) => setViewMode(mode)} 
          />
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <DataTable 
              data={mockLeadsData} 
              columns={columns} 
            />
          ) : (
            <LeadsKanbanView 
              stageGroups={stageGroups} 
              onStageChange={handleStageChange} 
            />
          )}
        </CardContent>
      </Card>
      
      <LeadCreateDialog open={openDialog} onOpenChange={setOpenDialog} />
    </div>
  );
};

export default LeadsManagement;
