
import React from 'react';
import FunnelStageEditDialog from './FunnelStageEditDialog';
import FunnelConfigDialog from './FunnelConfigDialog';
import NewStageDialog from './NewStageDialog';
import CreateFunnelDialog from './CreateFunnelDialog';
import { FunnelStage } from '@/types/recruitment';

interface FunnelDialogsProps {
  editDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;
  selectedStage: FunnelStage | null;
  onSaveStage: (stage: FunnelStage) => void;
  configDialogOpen: boolean;
  setConfigDialogOpen: (open: boolean) => void;
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
      <FunnelStageEditDialog 
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        stage={selectedStage}
        onSave={onSaveStage}
      />
      
      <FunnelConfigDialog 
        open={configDialogOpen}
        onOpenChange={setConfigDialogOpen}
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
        onSave={onCreateFunnel}
      />
    </>
  );
};

export default FunnelDialogs;
