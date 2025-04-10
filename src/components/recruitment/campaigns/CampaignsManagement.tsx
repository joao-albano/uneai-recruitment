
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, ListChecks, Zap, RadarIcon, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import CampaignsList from './list/CampaignsList';
import SuggestedActions from './radar/SuggestedActions';
import OpportunityRadar from './OpportunityRadar';
import AutomatedReengagement from './AutomatedReengagement';
import CampaignCreationDialog from './CampaignCreationDialog';
import CampaignDetailsDialog from './CampaignDetailsDialog';
import CampaignEditDialog from './edit/CampaignEditDialog';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';
import { Campaign } from '@/types/recruitment';
import { useOpportunityRadar } from './radar/hooks/useOpportunityRadar';

const CampaignsManagement: React.FC = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  
  const { campaigns, updateCampaign } = useCampaigns();
  const { opportunities, handleCreateCampaign } = useOpportunityRadar();
  
  const handleOpenDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setDetailsDialogOpen(true);
  };
  
  const handleOpenEdit = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setEditDialogOpen(true);
  };
  
  const handleSaveCampaign = (campaign: Campaign) => {
    updateCampaign(campaign.id, campaign);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6 max-w-7xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Campanhas de Captação</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie suas campanhas para captação de novos alunos
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/recruitment/documentation">
            <Button variant="outline" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Documentação
            </Button>
          </Link>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Campanha
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="campanhas" className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="campanhas" className="flex items-center gap-2">
            <ListChecks className="h-4 w-4" />
            <span>Campanhas Ativas</span>
          </TabsTrigger>
          <TabsTrigger value="reengajamento" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Reengajamento Automático</span>
          </TabsTrigger>
          <TabsTrigger value="oportunidades" className="flex items-center gap-2">
            <RadarIcon className="h-4 w-4" />
            <span>Radar de Oportunidades</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="campanhas" className="space-y-6">
          <CampaignsList 
            onOpenDetails={handleOpenDetails}
            onOpenEdit={handleOpenEdit}
          />
        </TabsContent>
        
        <TabsContent value="reengajamento" className="space-y-6">
          <AutomatedReengagement />
        </TabsContent>
        
        <TabsContent value="oportunidades" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <OpportunityRadar />
            </div>
            <div>
              <SuggestedActions 
                opportunities={opportunities} 
                onCreateCampaign={handleCreateCampaign} 
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Dialogs */}
      <CampaignCreationDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
      
      <CampaignDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        campaign={selectedCampaign}
      />
      
      <CampaignEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        campaign={selectedCampaign}
        onSave={handleSaveCampaign}
      />
    </div>
  );
};

export default CampaignsManagement;
