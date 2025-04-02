
import { useState, useEffect } from 'react';
import { mockLeadsData, getLeadsByStage } from '../data/mockLeadsData';

export const useLeadData = () => {
  const [leadsData, setLeadsData] = useState(mockLeadsData);
  const [stageGroups, setStageGroups] = useState(getLeadsByStage());
  const [filteredLeads, setFilteredLeads] = useState(leadsData);
  
  // Ensure stageGroups are updated when the leads data changes
  useEffect(() => {
    const updatedGroups = {
      "Contato Inicial": leadsData.filter(lead => lead.stage === "Contato Inicial"),
      "Agendamento": leadsData.filter(lead => lead.stage === "Agendamento"),
      "Visita": leadsData.filter(lead => lead.stage === "Visita"),
      "Matrícula": leadsData.filter(lead => lead.stage === "Matrícula"),
    };
    
    setStageGroups(updatedGroups);
  }, [leadsData]);

  return {
    leadsData,
    setLeadsData,
    filteredLeads,
    setFilteredLeads,
    stageGroups,
    setStageGroups
  };
};
