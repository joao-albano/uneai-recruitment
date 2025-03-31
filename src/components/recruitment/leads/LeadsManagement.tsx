
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

// Function to map stage to appropriate status
const getStatusForStage = (stage: string): string => {
  switch (stage) {
    case 'Contato Inicial':
      return 'Novo';
    case 'Agendamento':
      return 'Em Andamento';
    case 'Visita':
      return 'Aguardando';
    case 'Matrícula':
      return 'Finalizado';
    default:
      return 'Novo';
  }
};

const LeadsManagement: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  
  // Estado para armazenar os leads e seus agrupamentos por etapa
  const [leadsData, setLeadsData] = useState(mockLeadsData);
  const [stageGroups, setStageGroups] = useState(getLeadsByStage());
  
  const columns = getLeadColumns();

  // Função atualizada para mudar o estágio do lead e atualizar os dados
  const handleStageChange = (leadId: number, newStage: string) => {
    // Encontrar o lead nos dados
    const updatedLeads = leadsData.map(lead => {
      if (lead.id === leadId) {
        // Atualizar o estágio do lead e também o status correspondente
        const newStatus = getStatusForStage(newStage);
        return { ...lead, stage: newStage, status: newStatus };
      }
      return lead;
    });
    
    // Atualizar os leads
    setLeadsData(updatedLeads);
    
    // Reconstruir os agrupamentos por etapa
    const updatedGroups = {
      "Contato Inicial": updatedLeads.filter(lead => lead.stage === "Contato Inicial"),
      "Agendamento": updatedLeads.filter(lead => lead.stage === "Agendamento"),
      "Visita": updatedLeads.filter(lead => lead.stage === "Visita"),
      "Matrícula": updatedLeads.filter(lead => lead.stage === "Matrícula"),
    };
    
    // Atualizar os grupos de estágio
    setStageGroups(updatedGroups);
    
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
              data={leadsData} 
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
