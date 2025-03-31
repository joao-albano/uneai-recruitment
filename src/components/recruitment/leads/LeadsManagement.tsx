
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import LeadCreateDialog from './LeadCreateDialog';
import LeadsKanbanView from './LeadsKanbanView';
import LeadsHeader from './components/LeadsHeader';
import LeadsTabs from './components/LeadsTabs';
import LeadsToolbar from './components/LeadsToolbar';
import { getLeadColumns } from './components/LeadsTableColumns';
import { mockLeadsData, getLeadsByStage } from './data/mockLeadsData';
import { defaultFilters, LeadFilterOptions } from './types/leadFilters';
import EditLeadDialog from './dialogs/EditLeadDialog';
import ChangeStageDialog from './dialogs/ChangeStageDialog';
import DeleteLeadDialog from './dialogs/DeleteLeadDialog';
import LeadHistoryDialog from './dialogs/LeadHistoryDialog';
import { useToast } from '@/hooks/use-toast';

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
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<LeadFilterOptions>(defaultFilters);
  
  // Estados para gerenciar lead selecionado e diálogos
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [stageDialogOpen, setStageDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Estado para armazenar os leads e seus agrupamentos por etapa
  const [leadsData, setLeadsData] = useState(mockLeadsData);
  const [stageGroups, setStageGroups] = useState(getLeadsByStage(mockLeadsData));
  const [filteredLeads, setFilteredLeads] = useState(leadsData);
  
  const { toast } = useToast();
  
  // Configuração das colunas da tabela com handlers para ações
  const columns = getLeadColumns({
    onEditLead: (leadId) => handleEditLead(leadId),
    onChangeStage: (leadId) => handleChangeStage(leadId),
    onViewHistory: (leadId) => handleViewHistory(leadId),
    onDeleteLead: (leadId) => handleDeleteLead(leadId)
  });
  
  // Contagem de leads por status para as abas
  const getLeadCounts = () => {
    const allCount = filteredLeads.length;
    const newCount = filteredLeads.filter(lead => lead.status === 'Novo').length;
    const inProgressCount = filteredLeads.filter(lead => lead.status === 'Em Andamento').length;
    const scheduledCount = filteredLeads.filter(lead => lead.status === 'Aguardando').length;
    const enrolledCount = filteredLeads.filter(lead => lead.status === 'Finalizado').length;
    
    return {
      all: allCount,
      new: newCount,
      inProgress: inProgressCount,
      scheduled: scheduledCount,
      enrolled: enrolledCount
    };
  };
  
  // Função para filtrar leads com base nos filtros aplicados
  useEffect(() => {
    let filtered = leadsData;

    // Filtrar por texto de busca
    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.channel.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtro por aba (status)
    if (activeFilter !== 'all') {
      const statusMap: {[key: string]: string} = {
        'new': 'Novo',
        'inProgress': 'Em Andamento',
        'scheduled': 'Aguardando',
        'enrolled': 'Finalizado'
      };
      
      filtered = filtered.filter(lead => lead.status === statusMap[activeFilter]);
    }
    
    // Aplicar filtros adicionais
    if (filters.channel) {
      filtered = filtered.filter(lead => lead.channel === filters.channel);
    }
    
    if (filters.course) {
      filtered = filtered.filter(lead => lead.course === filters.course);
    }
    
    if (filters.stage) {
      filtered = filtered.filter(lead => lead.stage === filters.stage);
    }
    
    if (filters.status) {
      filtered = filtered.filter(lead => lead.status === filters.status);
    }
    
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        return (
          leadDate >= filters.startDate! && 
          leadDate <= filters.endDate!
        );
      });
    } else if (filters.startDate) {
      filtered = filtered.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        return leadDate >= filters.startDate!;
      });
    } else if (filters.endDate) {
      filtered = filtered.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        return leadDate <= filters.endDate!;
      });
    }
    
    setFilteredLeads(filtered);
    
    // Atualizar grupos do Kanban
    const updatedGroups = {
      "Contato Inicial": filtered.filter(lead => lead.stage === "Contato Inicial"),
      "Agendamento": filtered.filter(lead => lead.stage === "Agendamento"),
      "Visita": filtered.filter(lead => lead.stage === "Visita"),
      "Matrícula": filtered.filter(lead => lead.stage === "Matrícula"),
    };
    
    setStageGroups(updatedGroups);
  }, [leadsData, searchTerm, activeFilter, filters]);
  
  // Manipuladores para ações de leads
  const handleEditLead = (leadId: number) => {
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead(lead);
      setEditDialogOpen(true);
    }
  };
  
  const handleChangeStage = (leadId: number) => {
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead(lead);
      setStageDialogOpen(true);
    }
  };
  
  const handleViewHistory = (leadId: number) => {
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead(lead);
      setHistoryDialogOpen(true);
    }
  };
  
  const handleDeleteLead = (leadId: number) => {
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead(lead);
      setDeleteDialogOpen(true);
    }
  };
  
  // Salvar alterações em um lead
  const handleSaveLead = (updatedLead: any) => {
    const updatedLeads = leadsData.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    );
    
    setLeadsData(updatedLeads);
    toast({
      title: "Lead atualizado",
      description: "As informações do lead foram atualizadas com sucesso"
    });
  };
  
  // Salvar alteração de etapa
  const handleSaveStage = (leadId: number, newStage: string, notes: string) => {
    // Atualizar o estágio do lead e também o status correspondente
    const updatedLeads = leadsData.map(lead => {
      if (lead.id === leadId) {
        const newStatus = getStatusForStage(newStage);
        return { ...lead, stage: newStage, status: newStatus };
      }
      return lead;
    });
    
    setLeadsData(updatedLeads);
    console.log(`Lead ${leadId} movido para etapa: ${newStage}. Notas: ${notes}`);
  };
  
  // Confirmar exclusão de lead
  const handleConfirmDelete = (leadId: number) => {
    setLeadsData(prev => prev.filter(lead => lead.id !== leadId));
    toast({
      title: "Lead excluído",
      description: "O lead foi excluído com sucesso"
    });
  };
  
  // Limpar todos os filtros
  const clearFilters = () => {
    setFilters(defaultFilters);
    setSearchTerm('');
    setActiveFilter('all');
  };
  
  // Exportar leads para CSV
  const handleExportLeads = () => {
    // Simular exportação com um toast
    toast({
      title: "Exportação iniciada",
      description: `${filteredLeads.length} leads estão sendo exportados para CSV`
    });
  };
  
  return (
    <div className="container mx-auto py-6">
      <LeadsHeader onOpenDialog={() => setOpenDialog(true)} />
      <LeadsTabs 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter}
        counts={getLeadCounts()}
      />
      
      <Card>
        <CardHeader className="pb-3">
          <LeadsToolbar 
            viewMode={viewMode} 
            onViewModeChange={(mode) => setViewMode(mode)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
            exportLeads={handleExportLeads}
          />
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <DataTable 
              data={filteredLeads} 
              columns={columns} 
            />
          ) : (
            <LeadsKanbanView 
              stageGroups={stageGroups} 
              onStageChange={handleSaveStage} 
            />
          )}
        </CardContent>
      </Card>
      
      <LeadCreateDialog open={openDialog} onOpenChange={setOpenDialog} />
      
      {/* Diálogos para ações de leads */}
      {selectedLead && (
        <>
          <EditLeadDialog 
            open={editDialogOpen} 
            onOpenChange={setEditDialogOpen} 
            lead={selectedLead}
            onSave={handleSaveLead}
          />
          
          <ChangeStageDialog 
            open={stageDialogOpen} 
            onOpenChange={setStageDialogOpen} 
            lead={selectedLead}
            onSave={handleSaveStage}
          />
          
          <DeleteLeadDialog 
            open={deleteDialogOpen} 
            onOpenChange={setDeleteDialogOpen} 
            lead={selectedLead}
            onConfirm={handleConfirmDelete}
          />
          
          <LeadHistoryDialog 
            open={historyDialogOpen} 
            onOpenChange={setHistoryDialogOpen} 
            lead={selectedLead}
          />
        </>
      )}
    </div>
  );
};

export default LeadsManagement;
