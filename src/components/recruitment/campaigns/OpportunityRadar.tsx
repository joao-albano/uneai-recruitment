
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target,
  BarChart,
  Users,
  AlertCircle,
  Zap,
  TrendingUp,
  Filter,
  Download
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';
import { useNavigate } from 'react-router-dom';
import { Campaign } from '@/types/recruitment';

interface OpportunityItem {
  id: string;
  name: string;
  type: 'course' | 'interest' | 'location';
  count: number;
  urgency: 'high' | 'medium' | 'low';
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  description: string;
  suggestedAction?: string;
}

const demoOpportunities: OpportunityItem[] = [
  {
    id: '1',
    name: 'Medicina Veterinária',
    type: 'course',
    count: 32,
    urgency: 'high',
    trend: 'up',
    trendPercentage: 24,
    description: 'Interesse elevado em Medicina Veterinária, mas não temos o curso',
    suggestedAction: 'Parceria com faculdade de veterinária para curso de extensão'
  },
  {
    id: '2',
    name: 'Zona Leste',
    type: 'location',
    count: 45,
    urgency: 'medium',
    trend: 'up',
    trendPercentage: 15,
    description: 'Muitos leads da Zona Leste com dificuldade de deslocamento',
    suggestedAction: 'Oferecer transporte escolar ou aulas híbridas'
  },
  {
    id: '3',
    name: 'Inteligência Artificial',
    type: 'interest',
    count: 28,
    urgency: 'high',
    trend: 'up',
    trendPercentage: 38,
    description: 'Alto interesse em tecnologias de IA como complemento curricular'
  },
  {
    id: '4',
    name: 'Valor de Mensalidade',
    type: 'interest',
    count: 67,
    urgency: 'high',
    trend: 'stable',
    trendPercentage: 3,
    description: 'Preocupação com valores das mensalidades',
    suggestedAction: 'Criar campanha de bolsas parciais ou opções de financiamento'
  },
  {
    id: '5',
    name: 'Modalidade EAD',
    type: 'interest',
    count: 23,
    urgency: 'medium',
    trend: 'up',
    trendPercentage: 12,
    description: 'Interesse em modalidade 100% EAD para cursos presenciais'
  }
];

const OpportunityRadar: React.FC = () => {
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(demoOpportunities);
  const [filter, setFilter] = useState<'all' | 'course' | 'location' | 'interest'>('all');
  const { createCampaign, campaigns } = useCampaigns();
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
      status: 'active', // Changed from 'draft' to 'active' so it appears in active campaigns
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
    
    // Optionally navigate to the active campaigns tab
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
  
  const getUrgencyColor = (urgency: string): string => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" /> Radar de Oportunidades Acadêmicas
              </CardTitle>
              <CardDescription>
                Análise de intenções não atendidas e oportunidades de captação
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filtrar</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Tipo de Oportunidade</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilter('all')}>
                    Todas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('course')}>
                    Cursos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('location')}>
                    Localidades
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('interest')}>
                    Interesses
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Download className="h-3.5 w-3.5" />
                <span>Exportar</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr className="text-sm">
                  <th className="font-medium text-left px-4 py-3">Oportunidade</th>
                  <th className="font-medium text-left px-4 py-3">Tipo</th>
                  <th className="font-medium text-left px-4 py-3">Leads</th>
                  <th className="font-medium text-left px-4 py-3">Tendência</th>
                  <th className="font-medium text-left px-4 py-3">Urgência</th>
                  <th className="font-medium text-right px-4 py-3">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOpportunities.map(item => (
                  <tr key={item.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {item.description}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">
                        {item.type === 'course' && 'Curso'}
                        {item.type === 'location' && 'Localidade'}
                        {item.type === 'interest' && 'Interesse'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{item.count}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {item.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                        {item.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />}
                        {item.trend === 'stable' && <div className="h-4 w-4 border-t-2 border-gray-400" />}
                        <span className={
                          item.trend === 'up' ? 'text-green-600' : 
                          item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }>
                          {item.trendPercentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-full">
                        <Badge className={`${getUrgencyColor(item.urgency)} border`}>
                          {item.urgency === 'high' && 'Alta'}
                          {item.urgency === 'medium' && 'Média'}
                          {item.urgency === 'low' && 'Baixa'}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleCreateCampaign(item)}
                              >
                                <Zap className="h-3.5 w-3.5" />
                                <span className="sr-only">Criar Campanha</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Criar Campanha</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between px-6 py-4 border-t">
          <p className="text-sm text-muted-foreground">
            Exibindo {filteredOpportunities.length} de {opportunities.length} oportunidades
          </p>
          
          <Button variant="link" size="sm" className="gap-1" onClick={handleDetailedAnalysis}>
            <BarChart className="h-3.5 w-3.5" />
            <span>Ver Análise Detalhada</span>
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Sugestões de Ação</CardTitle>
          <CardDescription>
            Ações recomendadas para aproveitar oportunidades identificadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {opportunities
              .filter(opp => opp.suggestedAction)
              .map(opp => (
                <div key={`suggestion-${opp.id}`} className="flex gap-4 p-4 rounded-lg border">
                  <div className={`rounded-full p-2 h-fit ${
                    opp.urgency === 'high' ? 'bg-red-100 text-red-700' : 
                    opp.urgency === 'medium' ? 'bg-amber-100 text-amber-700' : 
                    'bg-blue-100 text-blue-700'
                  }`}>
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{opp.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{opp.description}</p>
                    <div className="mt-3">
                      <strong className="text-sm">Ação sugerida:</strong>
                      <p className="text-sm mt-1">{opp.suggestedAction}</p>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" className="gap-1" onClick={() => handleCreateCampaign(opp)}>
                        <Zap className="h-3.5 w-3.5" />
                        <span>Criar Campanha</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OpportunityRadar;
