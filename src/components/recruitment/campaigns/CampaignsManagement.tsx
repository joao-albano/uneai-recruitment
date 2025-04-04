
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Zap, Clock, Filter, Users, Target } from 'lucide-react';
import CampaignsList from './CampaignsList';
import AutomatedReengagement from './AutomatedReengagement';
import OpportunityRadar from './OpportunityRadar';
import CampaignCreationDialog from './CampaignCreationDialog';
import { useLocation } from 'react-router-dom';

const CampaignsManagement: React.FC = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const location = useLocation();

  // Set the active tab based on location state if available
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campanhas</h1>
          <p className="text-muted-foreground">
            Gerencie suas campanhas de captação e reengajamento
          </p>
        </div>
        <Button 
          className="flex items-center gap-1"
          onClick={() => setCreateDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Nova Campanha
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="active">Campanhas Ativas</TabsTrigger>
          <TabsTrigger value="automated">Reengajamento Automático</TabsTrigger>
          <TabsTrigger value="radar">Radar de Oportunidades</TabsTrigger>
          <TabsTrigger value="archived">Campanhas Arquivadas</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <CampaignsList showArchived={false} />
        </TabsContent>

        <TabsContent value="automated">
          <AutomatedReengagement />
        </TabsContent>

        <TabsContent value="radar">
          <OpportunityRadar />
        </TabsContent>

        <TabsContent value="archived">
          <CampaignsList showArchived={true} />
        </TabsContent>
      </Tabs>

      <CampaignCreationDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
};

export default CampaignsManagement;
