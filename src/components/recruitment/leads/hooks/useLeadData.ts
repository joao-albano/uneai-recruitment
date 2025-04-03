
import { useState, useEffect, useCallback } from 'react';
import { mockLeadsData, getLeadsByStage } from '../data/mockLeadsData';

export const useLeadData = () => {
  // Create deep copies to avoid mutation issues
  const [leadsData, setLeadsData] = useState(() => 
    JSON.parse(JSON.stringify(mockLeadsData))
  );
  const [stageGroups, setStageGroups] = useState(() => getLeadsByStage());
  const [filteredLeads, setFilteredLeads] = useState(() => 
    JSON.parse(JSON.stringify(leadsData))
  );
  
  // Update stage groups when leads data changes
  useEffect(() => {
    try {
      const updatedGroups = {
        "Contato Inicial": leadsData.filter(lead => lead.stage === "Contato Inicial"),
        "Agendamento": leadsData.filter(lead => lead.stage === "Agendamento"),
        "Visita": leadsData.filter(lead => lead.stage === "Visita"),
        "Matrícula": leadsData.filter(lead => lead.stage === "Matrícula"),
      };
      
      setStageGroups(updatedGroups);
      
      // Also update filtered leads when leadsData changes
      setFilteredLeads(JSON.parse(JSON.stringify(leadsData)));
    } catch (error) {
      console.error("Error updating stage groups:", error);
    }
  }, [leadsData]);

  // Safe setter for leadsData that handles errors
  const setLeadsDataSafely = useCallback((newLeadsOrUpdater: any[] | ((prev: any[]) => any[])) => {
    try {
      if (typeof newLeadsOrUpdater === 'function') {
        setLeadsData(prev => {
          try {
            const result = newLeadsOrUpdater(prev);
            // Create a deep copy of the result
            return JSON.parse(JSON.stringify(result));
          } catch (error) {
            console.error("Error in leadsData updater function:", error);
            return prev;
          }
        });
      } else {
        // Create a deep copy of the new data
        setLeadsData(JSON.parse(JSON.stringify(newLeadsOrUpdater)));
      }
    } catch (error) {
      console.error("Error setting leads data:", error);
    }
  }, []);

  // Add a helper method to add a new lead directly to the data
  const addNewLead = useCallback((lead: any) => {
    try {
      setLeadsData(prevLeads => {
        // Create a deep copy of the current leads and add the new lead
        const updatedLeads = [...JSON.parse(JSON.stringify(prevLeads)), lead];
        return updatedLeads;
      });
      console.log("Lead added to state:", lead);
    } catch (error) {
      console.error("Error adding new lead:", error);
    }
  }, []);

  return {
    leadsData,
    setLeadsData: setLeadsDataSafely,
    filteredLeads,
    setFilteredLeads,
    stageGroups,
    setStageGroups,
    addNewLead
  };
};
