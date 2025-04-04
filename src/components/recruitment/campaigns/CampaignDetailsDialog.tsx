
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Campaign } from '@/types/recruitment';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Edit } from 'lucide-react';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';
import CampaignEditDialog from './CampaignEditDialog';
import CampaignDetailsHeader from './details/CampaignDetailsHeader';
import CampaignOverviewTab from './details/CampaignOverviewTab';
import CampaignPerformanceTab from './details/CampaignPerformanceTab';
import CampaignConfigurationTab from './details/CampaignConfigurationTab';

interface CampaignDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign;
}

const CampaignDetailsDialog: React.FC<CampaignDetailsDialogProps> = ({
  open,
  onOpenChange,
  campaign
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const { updateCampaign } = useCampaigns();
  
  const handleSaveCampaign = (updatedCampaign: Campaign) => {
    updateCampaign(updatedCampaign.id, updatedCampaign);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl">
          <CampaignDetailsHeader campaign={campaign} />
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="performance">Desempenho</TabsTrigger>
              <TabsTrigger value="configuration">Configuração</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <CampaignOverviewTab campaign={campaign} />
            </TabsContent>
            
            <TabsContent value="performance">
              <CampaignPerformanceTab campaign={campaign} />
            </TabsContent>
            
            <TabsContent value="configuration">
              <CampaignConfigurationTab campaign={campaign} />
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            <Button onClick={() => setEditOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar Campanha
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de edição */}
      <CampaignEditDialog 
        open={editOpen} 
        onOpenChange={setEditOpen} 
        campaign={campaign}
        onSave={handleSaveCampaign}
      />
    </>
  );
};

export default CampaignDetailsDialog;
