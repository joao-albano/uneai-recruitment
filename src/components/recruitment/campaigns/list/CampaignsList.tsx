
import React from 'react';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Archive, Sparkles } from 'lucide-react';
import { Campaign } from '@/types/recruitment';
import CampaignCardWithActions from './CampaignCardWithActions';
import EmptyCampaignState from './EmptyCampaignState';

interface CampaignsListProps {
  onOpenDetails: (campaign: Campaign) => void;
  onOpenEdit: (campaign: Campaign) => void;
}

const CampaignsList: React.FC<CampaignsListProps> = ({ onOpenDetails, onOpenEdit }) => {
  const { campaigns, isLoading, archiveCampaign } = useCampaigns();
  
  const activeCampaigns = campaigns.filter(c => c.status !== 'completed');
  const archivedCampaigns = campaigns.filter(c => c.status === 'completed');
  
  const handleArchive = (campaign: Campaign) => {
    archiveCampaign(campaign.id);
  };
  
  const handleToggleStatus = (campaign: Campaign) => {
    const newStatus = campaign.status === 'active' ? 'paused' : 'active';
    // Implemente a funcionalidade para alterar o status da campanha
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Campanhas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-40">
            <p className="text-muted-foreground">Carregando campanhas...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerenciamento de Campanhas</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="active" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              <span>Ativas ({activeCampaigns.length})</span>
            </TabsTrigger>
            <TabsTrigger value="archived" className="flex items-center gap-1">
              <Archive className="h-4 w-4" />
              <span>Arquivadas ({archivedCampaigns.length})</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCampaigns.length === 0 ? (
                <EmptyCampaignState />
              ) : (
                activeCampaigns.map(campaign => (
                  <CampaignCardWithActions
                    key={campaign.id}
                    campaign={campaign}
                    onView={() => onOpenDetails(campaign)}
                    onEdit={() => onOpenEdit(campaign)}
                    onArchive={handleArchive}
                    onToggleStatus={handleToggleStatus}
                  />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="archived">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {archivedCampaigns.length === 0 ? (
                <div className="col-span-2 flex justify-center items-center h-40">
                  <p className="text-muted-foreground">Não há campanhas arquivadas.</p>
                </div>
              ) : (
                archivedCampaigns.map(campaign => (
                  <CampaignCardWithActions
                    key={campaign.id}
                    campaign={campaign}
                    onView={() => onOpenDetails(campaign)}
                    onEdit={() => onOpenEdit(campaign)}
                    onArchive={handleArchive}
                    onToggleStatus={handleToggleStatus}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CampaignsList;
