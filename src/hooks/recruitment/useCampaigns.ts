
import { useState, useEffect } from 'react';
import { Campaign } from '@/types/recruitment';
import { v4 as uuidv4 } from 'uuid';

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
  }
];

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simula carregamento de dados
    const loadCampaigns = async () => {
      try {
        // Simular atraso de rede
        await new Promise(resolve => setTimeout(resolve, 500));
        setCampaigns(DEMO_CAMPAIGNS);
        setIsLoading(false);
      } catch (err) {
        setError('Erro ao carregar campanhas');
        setIsLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  const createCampaign = (campaign: Omit<Campaign, 'id'>) => {
    const newCampaign = {
      ...campaign,
      id: uuidv4(),
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
        campaign.id === id ? { ...campaign, ...updates } : campaign
      )
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  };

  const archiveCampaign = (id: string) => {
    updateCampaign(id, { status: 'completed' });
  };

  // Filtrar campanhas por status
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
