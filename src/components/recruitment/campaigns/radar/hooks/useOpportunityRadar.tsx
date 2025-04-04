
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';
import { toast } from '@/hooks/use-toast';
import { OpportunityItem, Campaign } from '@/types/recruitment';
import { demoOpportunities } from '../data/demoOpportunities';

export const useOpportunityRadar = () => {
  const [opportunities] = useState<OpportunityItem[]>(demoOpportunities);
  const [filter, setFilter] = useState<'all' | 'course' | 'location' | 'interest'>('all');
  const { createCampaign } = useCampaigns();
  const navigate = useNavigate();
  
  const filteredOpportunities = opportunities.filter(
    opp => filter === 'all' || opp.type === filter
  );
  
  const handleCreateCampaign = (item: OpportunityItem) => {
    // Create a campaign based on the opportunity
    const newCampaign: Omit<Campaign, 'id'> = {
      name: `Campanha: ${item.name}`,
      description: `Campanha automática baseada em oportunidade: ${item.description}`,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days later
      status: 'active', // Active so it appears in active campaigns
      budget: item.count * 100, // Simple budget calculation
      channel: ['mail', 'whatsapp'],
      performance: {
        leadsGenerated: 0,
        conversion: 0,
        cost: 0
      },
      target: {
        audience: item.type === 'location' ? item.name : 'Geral',
        courses: item.type === 'course' ? [item.name] : ['Todos os cursos']
      }
    };
    
    const createdCampaign = createCampaign(newCampaign);
    
    toast({
      title: 'Campanha criada com sucesso',
      description: `Nova campanha "${createdCampaign.name}" criada e disponível para edição`,
    });
    
    // Navigate to the active campaigns tab
    setTimeout(() => {
      navigate('/recruitment/campaigns', { state: { activeTab: 'active' } });
    }, 1500);
  };
  
  const handleDetailedAnalysis = () => {
    navigate('/recruitment/detailed-analysis', { 
      state: { 
        analyticsSource: 'opportunity-radar',
        opportunities: filteredOpportunities 
      } 
    });
  };
  
  return {
    opportunities,
    filteredOpportunities,
    filter,
    setFilter,
    handleCreateCampaign,
    handleDetailedAnalysis
  };
};
