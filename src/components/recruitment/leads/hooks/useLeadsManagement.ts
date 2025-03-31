
import { useState, useEffect } from 'react';
import { mockLeadsData, getLeadsByStage } from '../data/mockLeadsData';
import { defaultFilters, LeadFilterOptions } from '../types/leadFilters';
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

export const useLeadsManagement = () => {
  // State management
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
  const [stageGroups, setStageGroups] = useState(getLeadsByStage());
  const [filteredLeads, setFilteredLeads] = useState(leadsData);
  
  const { toast } = useToast();
  
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
  
  // Lead action handlers
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

  return {
    // States
    openDialog,
    setOpenDialog,
    viewMode,
    setViewMode,
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    selectedLead,
    editDialogOpen,
    setEditDialogOpen,
    stageDialogOpen,
    setStageDialogOpen,
    historyDialogOpen,
    setHistoryDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    filteredLeads,
    stageGroups,
    
    // Functions
    handleEditLead,
    handleChangeStage,
    handleViewHistory,
    handleDeleteLead,
    handleSaveLead,
    handleSaveStage,
    handleConfirmDelete,
    clearFilters,
    handleExportLeads,
    getLeadCounts
  };
};
