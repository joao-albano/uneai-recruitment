
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CampaignsList from './list/CampaignsList';
import SuggestedActions from './radar/SuggestedActions';
import OpportunityRadar from './OpportunityRadar';
import AutomatedReengagement from './AutomatedReengagement';
import CampaignCreationDialog from './CampaignCreationDialog';
import CampaignDetailsDialog from './CampaignDetailsDialog';
import CampaignEditDialog from './CampaignEditDialog';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';
import { Campaign } from '@/types/recruitment';

const CampaignsManagement: React.FC = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  
  const { campaigns } = useCampaigns();
  
  const handleOpenDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setDetailsDialogOpen(true);
  };
  
  const handleOpenEdit = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setEditDialogOpen(true);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-8 max-w-6xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Campanhas de Captação</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie suas campanhas para captação de novos alunos
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Campanha
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CampaignsList 
            campaigns={campaigns}
            onOpenDetails={handleOpenDetails}
            onOpenEdit={handleOpenEdit}
          />
          <AutomatedReengagement />
        </div>
        
        <div className="space-y-6">
          <SuggestedActions />
          <OpportunityRadar />
        </div>
      </div>
      
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
      />
    </div>
  );
};

export default CampaignsManagement;
