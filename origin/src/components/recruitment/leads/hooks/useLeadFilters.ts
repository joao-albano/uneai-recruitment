
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
    
    // Date filtering - fix date comparison by standardizing the date formats
    if (filters.startDate || filters.endDate) {
      filtered = filtered.filter(lead => {
        // Ensure we're working with date objects
        const leadDate = typeof lead.createdAt === 'string' ? new Date(lead.createdAt) : lead.createdAt;
        
        // Reset time parts to compare only dates
        const leadDateOnly = new Date(leadDate);
        leadDateOnly.setHours(0, 0, 0, 0);
        
        // Both start and end dates are set
        if (filters.startDate && filters.endDate) {
          const startDateOnly = new Date(filters.startDate);
          startDateOnly.setHours(0, 0, 0, 0);
          
          const endDateOnly = new Date(filters.endDate);
          endDateOnly.setHours(23, 59, 59, 999); // End of day
          
          return leadDateOnly >= startDateOnly && leadDateOnly <= endDateOnly;
        } 
        // Only start date is set
        else if (filters.startDate) {
          const startDateOnly = new Date(filters.startDate);
          startDateOnly.setHours(0, 0, 0, 0);
          
          return leadDateOnly >= startDateOnly;
        } 
        // Only end date is set
        else if (filters.endDate) {
          const endDateOnly = new Date(filters.endDate);
          endDateOnly.setHours(23, 59, 59, 999); // End of day
          
          return leadDateOnly <= endDateOnly;
        }
        
        return true;
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
