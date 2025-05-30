
import { useState, useEffect } from 'react';
import { Campaign } from '@/types/recruitment';
import { v4 as uuidv4 } from 'uuid';

// Key for storing campaigns in localStorage
const CAMPAIGNS_STORAGE_KEY = 'eduquest_recruitment_campaigns';

// Demo campaigns as initial data
const DEMO_CAMPAIGNS: Campaign[] = [
  {
    id: uuidv4(),
    name: 'Campanha de Matrícula 2024',
    description: 'Campanha principal para o período de matrículas do segundo semestre',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-07-31'),
    status: 'active',
    budget: 5000,
    channel: ['mail', 'whatsapp', 'voice'],
    performance: {
      leadsGenerated: 156,
      conversion: 23,
      cost: 2100,
    },
    target: {
      audience: 'Ensino Médio',
      location: 'Zona Sul',
      courses: ['Administração', 'Direito']
    }
  },
  {
    id: uuidv4(),
    name: 'Reengajamento - Leads Inativos 30 dias',
    description: 'Campanha automática para reengajar leads sem interação há mais de 30 dias',
    startDate: new Date('2024-05-15'),
    status: 'active',
    budget: 1200,
    channel: ['mail', 'whatsapp'],
    performance: {
      leadsGenerated: 78,
      conversion: 12,
      cost: 450,
    },
    target: {
      audience: 'Leads Inativos',
      courses: ['Engenharia Civil', 'Medicina']
    },
    isAutomated: true,
  },
  {
    id: uuidv4(),
    name: 'Black Friday Educacional',
    description: 'Descontos especiais para matrículas antecipadas',
    startDate: new Date('2024-11-20'),
    endDate: new Date('2024-11-30'),
    status: 'draft',
    budget: 8000,
    channel: ['mail', 'whatsapp', 'voice', 'sms'],
    performance: {
      leadsGenerated: 0,
      conversion: 0,
      cost: 0,
    },
    target: {
      courses: ['Todos os cursos']
    }
  },
  {
    id: uuidv4(),
    name: 'Campanha: Modalidade EAD',
    description: 'Campanha automática baseada em oportunidade: interesse em modalidade 100% EAD para cursos presenciais',
    startDate: new Date('2025-04-04'),
    endDate: new Date('2025-05-05'),
    status: 'active',
    budget: 3000,
    channel: ['mail', 'whatsapp'],
    performance: {
      leadsGenerated: 0,
      conversion: 0,
      cost: 0,
    },
    target: {
      audience: 'Geral',
      courses: ['Todos os cursos']
    },
    isAutomated: true,
  }
];

// Helper to load campaigns from localStorage
const loadCampaignsFromStorage = (): Campaign[] => {
  try {
    const storedData = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      
      // Convert date strings back to Date objects and ensure channel is always an array
      return parsedData.map((campaign: any) => ({
        ...campaign,
        startDate: new Date(campaign.startDate),
        endDate: campaign.endDate ? new Date(campaign.endDate) : undefined,
        channel: campaign.channel || [] // Ensure channel is never null
      }));
    }
  } catch (error) {
    console.error('Error loading campaigns from storage:', error);
  }
  
  return DEMO_CAMPAIGNS;
};

// Helper to save campaigns to localStorage
const saveCampaignsToStorage = (campaigns: Campaign[]) => {
  try {
    // Ensure each campaign has a channel property before saving
    const safeData = campaigns.map(campaign => ({
      ...campaign,
      channel: campaign.channel || []
    }));
    
    localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(safeData));
  } catch (error) {
    console.error('Error saving campaigns to storage:', error);
  }
};

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load saved campaigns from localStorage or use demo data
    const loadCampaigns = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setCampaigns(loadCampaignsFromStorage());
        setIsLoading(false);
      } catch (err) {
        setError('Erro ao carregar campanhas');
        setIsLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  // Save campaigns to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && campaigns.length > 0) {
      saveCampaignsToStorage(campaigns);
    }
  }, [campaigns, isLoading]);

  const createCampaign = (campaign: Omit<Campaign, 'id'>) => {
    const newCampaign = {
      ...campaign,
      id: uuidv4(),
      channel: campaign.channel || [], // Ensure channel is never null
      performance: campaign.performance || {
        leadsGenerated: 0,
        conversion: 0,
        cost: 0,
      }
    };
    
    setCampaigns(prev => [...prev, newCampaign]);
    return newCampaign;
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === id ? { 
          ...campaign, 
          ...updates,
          channel: updates.channel || campaign.channel || [] // Ensure channel is never null
        } : campaign
      )
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  };

  const archiveCampaign = (id: string) => {
    updateCampaign(id, { status: 'completed' });
  };

  // Filter campaigns by status
  const getArchivedCampaigns = () => {
    return campaigns.filter(campaign => campaign.status === 'completed');
  };

  const getActiveCampaigns = () => {
    return campaigns.filter(campaign => campaign.status !== 'completed');
  };

  return {
    campaigns,
    isLoading,
    error,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    archiveCampaign,
    getArchivedCampaigns,
    getActiveCampaigns
  };
};
