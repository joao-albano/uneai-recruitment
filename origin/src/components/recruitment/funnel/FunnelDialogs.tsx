
import React from 'react';
import FunnelStageDialog from './FunnelStageDialog';
import FunnelConfigDialog from './FunnelConfigDialog';
import NewStageDialog from './NewStageDialog';
import CreateFunnelDialog from './CreateFunnelDialog';
import { FunnelStage, Funnel } from '@/types/recruitment';

interface FunnelDialogsProps {
  editDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;
  selectedStage: FunnelStage | null;
  onSaveStage: (stage: FunnelStage) => void;
  configDialogOpen: boolean;
  setConfigDialogOpen: (open: boolean) => void;
  selectedFunnel: Funnel | null;
  onSaveConfig: (config: any) => void;
  newStageDialogOpen: boolean;
  setNewStageDialogOpen: (open: boolean) => void;
  onSaveNewStage: (stageData: any) => void;
  createFunnelDialogOpen: boolean;
  setCreateFunnelDialogOpen: (open: boolean) => void;
  onCreateFunnel: (funnelData: any) => void;
}

const FunnelDialogs: React.FC<FunnelDialogsProps> = ({
  editDialogOpen,
  setEditDialogOpen,
  selectedStage,
  onSaveStage,
  configDialogOpen,
  setConfigDialogOpen,
  selectedFunnel,
  onSaveConfig,
  newStageDialogOpen,
  setNewStageDialogOpen,
  onSaveNewStage,
  createFunnelDialogOpen,
  setCreateFunnelDialogOpen,
  onCreateFunnel
}) => {
  return (
    <>
      <FunnelStageDialog 
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        stage={selectedStage}
        onSave={onSaveStage}
      />
      
      <FunnelConfigDialog 
        open={configDialogOpen}
        onOpenChange={setConfigDialogOpen}
        funnel={selectedFunnel}
        onSave={onSaveConfig}
      />
      
      <NewStageDialog 
        open={newStageDialogOpen}
        onOpenChange={setNewStageDialogOpen}
        onSave={onSaveNewStage}
      />
      
      <CreateFunnelDialog 
        open={createFunnelDialogOpen}
        onOpenChange={setCreateFunnelDialogOpen}
        onCreateFunnel={onCreateFunnel}
      />
    </>
  );
};

export default FunnelDialogs;
