
import { useEffect, useState } from 'react';
import { defaultFilters, LeadFilterOptions } from '../types/leadFilters';
import { useToast } from '@/components/ui/use-toast';

export const useLeadFilters = (
  leadsData: any[],
  setFilteredLeads: React.Dispatch<React.SetStateAction<any[]>>,
  setStageGroups: React.Dispatch<React.SetStateAction<any>>
) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<LeadFilterOptions>(defaultFilters);
  const { toast } = useToast();

  // Apply filters to leads data
  useEffect(() => {
    let filtered = [...leadsData]; // Create a copy to avoid reference issues
    let appliedFiltersCount = 0;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.channel.toLowerCase().includes(searchTerm.toLowerCase())
      );
      appliedFiltersCount++;
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
      appliedFiltersCount++;
    }
    
    // Apply additional filters
    if (filters.channel) {
      filtered = filtered.filter(lead => lead.channel === filters.channel);
      appliedFiltersCount++;
    }
    
    if (filters.course) {
      filtered = filtered.filter(lead => lead.course === filters.course);
      appliedFiltersCount++;
    }
    
    if (filters.stage) {
      filtered = filtered.filter(lead => lead.stage === filters.stage);
      appliedFiltersCount++;
    }
    
    if (filters.status) {
      filtered = filtered.filter(lead => lead.status === filters.status);
      appliedFiltersCount++;
    }
    
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        return (
          leadDate >= filters.startDate! && 
          leadDate <= filters.endDate!
        );
      });
      appliedFiltersCount++;
    } else if (filters.startDate) {
      filtered = filtered.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        return leadDate >= filters.startDate!;
      });
      appliedFiltersCount++;
    } else if (filters.endDate) {
      filtered = filtered.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        return leadDate <= filters.endDate!;
      });
      appliedFiltersCount++;
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

    // Show toast when filters are significantly changed
    if (appliedFiltersCount > 0) {
      console.log(`Filtros aplicados: ${appliedFiltersCount}`);
    }
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
