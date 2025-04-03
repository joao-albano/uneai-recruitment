
import React from 'react';
import FunnelStageEditDialog from './FunnelStageEditDialog';
import FunnelConfigDialog from './FunnelConfigDialog';
import NewStageDialog from './NewStageDialog';
import { FunnelStage } from '@/types/recruitment';

interface FunnelDialogsProps {
  editDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;
  selectedStage: FunnelStage | null;
  onSaveStage: (updatedStage: FunnelStage) => void;
  configDialogOpen: boolean;
  setConfigDialogOpen: (open: boolean) => void;
  onSaveConfig: (config: {
    autoMoveLeads: boolean;
    notifyStaleLeads: boolean;
    staleDays: number;
  }) => void;
  newStageDialogOpen: boolean;
  setNewStageDialogOpen: (open: boolean) => void;
  onSaveNewStage: (stageData: {
    name: string;
    description: string;
    expectedDuration: number;
  }) => void;
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
  onSaveNewStage
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
    </>
  );
};

export default FunnelDialogs;
