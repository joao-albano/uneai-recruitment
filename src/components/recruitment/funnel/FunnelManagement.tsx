
import React from 'react';
import FunnelHeader from './FunnelHeader';
import FunnelVisualizationCard from './FunnelVisualizationCard';
import ConversionAnalysisCard from './ConversionAnalysisCard';
import FunnelDialogs from './FunnelDialogs';
import { useFunnelStages } from './hooks/useFunnelStages';

const FunnelManagement: React.FC = () => {
  const {
    funnelStages,
    selectedStage,
    editDialogOpen,
    setEditDialogOpen,
    configDialogOpen,
    setConfigDialogOpen,
    newStageDialogOpen,
    setNewStageDialogOpen,
    handleEditClick,
    handleSaveStage,
    handleAddNewStage,
    handleSaveConfig
  } = useFunnelStages();

  return (
    <div className="space-y-6">
      <FunnelHeader 
        onConfigClick={() => setConfigDialogOpen(true)}
        onNewStageClick={() => setNewStageDialogOpen(true)}
      />

      <FunnelVisualizationCard 
        stages={funnelStages} 
        onEditStage={handleEditClick}
      />
      
      <ConversionAnalysisCard stages={funnelStages} />
      
      <FunnelDialogs
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        selectedStage={selectedStage}
        onSaveStage={handleSaveStage}
        configDialogOpen={configDialogOpen}
        setConfigDialogOpen={setConfigDialogOpen}
        onSaveConfig={handleSaveConfig}
        newStageDialogOpen={newStageDialogOpen}
        setNewStageDialogOpen={setNewStageDialogOpen}
        onSaveNewStage={handleAddNewStage}
      />
    </div>
  );
};

export default FunnelManagement;
