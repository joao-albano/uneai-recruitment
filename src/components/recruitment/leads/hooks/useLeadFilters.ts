
import { useEffect, useState } from 'react';
import { defaultFilters, LeadFilterOptions } from '../types/leadFilters';

export const useLeadFilters = (
  leadsData: any[],
  setFilteredLeads: React.Dispatch<React.SetStateAction<any[]>>,
  setStageGroups: React.Dispatch<React.SetStateAction<any>>
) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<LeadFilterOptions>(defaultFilters);

  // Apply filters to leads data
  useEffect(() => {
    let filtered = [...leadsData]; // Create a copy to avoid reference issues
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.channel.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by tab (status)
    if (activeFilter !== 'all') {
      const statusMap: {[key: string]: string} = {
        'new': 'Novo',
        'inProgress': 'Em Andamento',
        'scheduled': 'Aguardando',
        'enrolled': 'Finalizado'
      };
      
      filtered = filtered.filter(lead => lead.status === statusMap[activeFilter]);
    }
    
    // Apply additional filters
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
    
    // Update Kanban groups
    const updatedGroups = {
      "Contato Inicial": filtered.filter(lead => lead.stage === "Contato Inicial"),
      "Agendamento": filtered.filter(lead => lead.stage === "Agendamento"),
      "Visita": filtered.filter(lead => lead.stage === "Visita"),
      "Matrícula": filtered.filter(lead => lead.stage === "Matrícula"),
    };
    
    setStageGroups(updatedGroups);
  }, [leadsData, searchTerm, activeFilter, filters, setFilteredLeads, setStageGroups]);

  // Clear all filters
  const clearFilters = () => {
    setFilters(defaultFilters);
    setSearchTerm('');
    setActiveFilter('all');
  };

  // Get leads count by status for tabs
  const getLeadCounts = () => {
    const allCount = leadsData.length;
    const newCount = leadsData.filter(lead => lead.status === 'Novo').length;
    const inProgressCount = leadsData.filter(lead => lead.status === 'Em Andamento').length;
    const scheduledCount = leadsData.filter(lead => lead.status === 'Aguardando').length;
    const enrolledCount = leadsData.filter(lead => lead.status === 'Finalizado').length;
    
    return {
      all: allCount,
      new: newCount,
      inProgress: inProgressCount,
      scheduled: scheduledCount,
      enrolled: enrolledCount
    };
  };

  return {
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    clearFilters,
    getLeadCounts
  };
};
