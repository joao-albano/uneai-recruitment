
import React, { useEffect } from 'react';
import FunnelHeader from './FunnelHeader';
import FunnelVisualizationCard from './FunnelVisualizationCard';
import ConversionAnalysisCard from './ConversionAnalysisCard';
import FunnelDialogs from './FunnelDialogs';
import FunnelSelector from './FunnelSelector';
import AiSuggestions from './AiSuggestions';
import { useFunnelStages } from './hooks/useFunnelStages';
import { useFunnels } from './hooks/useFunnels';

const FunnelManagement: React.FC = () => {
  const {
    funnelStages,
    setFunnelStages,
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
    handleSaveConfig,
    addSubStage,
  } = useFunnelStages();

  const {
    funnels,
    selectedFunnel,
    setSelectedFunnel,
    createFunnelDialogOpen,
    setCreateFunnelDialogOpen,
    handleCreateFunnel,
  } = useFunnels();

  // Update the funnel stages when the selected funnel changes
  useEffect(() => {
    if (selectedFunnel) {
      setFunnelStages(selectedFunnel.stages || []);
    }
  }, [selectedFunnel, setFunnelStages]);

  return (
    <div className="space-y-6">
      <FunnelHeader 
        onConfigClick={() => setConfigDialogOpen(true)}
        onNewStageClick={() => setNewStageDialogOpen(true)}
        onNewFunnelClick={() => setCreateFunnelDialogOpen(true)}
      />

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <FunnelSelector 
            funnels={funnels} 
            selectedFunnel={selectedFunnel} 
            onSelectFunnel={setSelectedFunnel}
            onCreateFunnel={() => setCreateFunnelDialogOpen(true)}
          />
        </div>
        
        <div className="md:col-span-8">
          <FunnelVisualizationCard 
            stages={funnelStages} 
            onEditStage={handleEditClick}
            onAddSubStage={addSubStage}
          />
        </div>
      </div>
      
      <AiSuggestions funnel={selectedFunnel} stages={funnelStages} />
      
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
        createFunnelDialogOpen={createFunnelDialogOpen}
        setCreateFunnelDialogOpen={setCreateFunnelDialogOpen}
        onCreateFunnel={handleCreateFunnel}
      />
    </div>
  );
};

export default FunnelManagement;
