
import React, { useState } from 'react';
import FunnelHeader from './FunnelHeader';
import FunnelSelector from './FunnelSelector';
import FunnelVisualizationCard from './FunnelVisualizationCard';
import CreateFunnelDialog from './CreateFunnelDialog';
import FunnelStageDialog from './FunnelStageDialog';
import FunnelConfigDialog from './FunnelConfigDialog';
import FunnelStageEditDialog from './FunnelStageEditDialog';
import AiSuggestions from './AiSuggestions';
import ConversionAnalysisCard from './ConversionAnalysisCard';
import { useFunnels } from './hooks/useFunnels';

const FunnelManagement: React.FC = () => {
  const {
    funnels,
    selectedFunnel,
    setSelectedFunnel,
    createFunnelDialogOpen,
    setCreateFunnelDialogOpen,
    handleCreateFunnel,
    updateFunnelStages,
    toggleFunnelActive
  } = useFunnels();
  
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [stageDialogOpen, setStageDialogOpen] = useState(false);
  const [editStageDialogOpen, setEditStageDialogOpen] = useState(false);
  const [stageToEdit, setStageToEdit] = useState(null);
  const [parentStageId, setParentStageId] = useState<string | null>(null);
  
  const handleConfigClick = () => {
    setConfigDialogOpen(true);
  };
  
  const handleNewStageClick = () => {
    setParentStageId(null);
    setStageDialogOpen(true);
  };
  
  const handleNewFunnelClick = () => {
    setCreateFunnelDialogOpen(true);
  };
  
  const handleEditStage = (stage) => {
    setStageToEdit(stage);
    setEditStageDialogOpen(true);
  };
  
  const handleAddSubStage = (stageId) => {
    setParentStageId(stageId);
    setStageDialogOpen(true);
  };
  
  const stages = selectedFunnel?.stages || [];

  return (
    <div className="w-full py-6 space-y-6">
      <FunnelHeader 
        onConfigClick={handleConfigClick}
        onNewStageClick={handleNewStageClick}
        onNewFunnelClick={handleNewFunnelClick}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <FunnelVisualizationCard 
            stages={stages}
            onEditStage={handleEditStage}
            onAddSubStage={handleAddSubStage}
          />
        </div>
        
        <div className="space-y-6">
          <FunnelSelector 
            funnels={funnels}
            selectedFunnel={selectedFunnel}
            onSelectFunnel={setSelectedFunnel}
            onCreateFunnel={handleNewFunnelClick}
            onToggleFunnelActive={toggleFunnelActive}
          />
          
          <AiSuggestions 
            funnel={selectedFunnel}
            stages={stages}
          />
          
          <ConversionAnalysisCard 
            funnel={selectedFunnel}
            stages={stages}
          />
        </div>
      </div>
      
      {/* Dialogs */}
      <CreateFunnelDialog 
        open={createFunnelDialogOpen}
        onOpenChange={setCreateFunnelDialogOpen}
        onCreateFunnel={handleCreateFunnel}
      />
      
      <FunnelStageDialog 
        open={stageDialogOpen}
        onOpenChange={setStageDialogOpen}
        funnelId={selectedFunnel?.id}
        parentStageId={parentStageId}
        stages={stages}
        onAddStage={(newStage) => {
          if (selectedFunnel) {
            let updatedStages;
            
            if (parentStageId) {
              // Adding sub-stage
              updatedStages = stages.map(stage => {
                if (stage.id === parentStageId) {
                  return {
                    ...stage,
                    subStages: [...(stage.subStages || []), newStage]
                  };
                }
                return stage;
              });
            } else {
              // Adding main stage
              updatedStages = [...stages, newStage];
            }
            
            updateFunnelStages(selectedFunnel.id, updatedStages);
          }
        }}
      />
      
      <FunnelConfigDialog 
        open={configDialogOpen}
        onOpenChange={setConfigDialogOpen}
        funnel={selectedFunnel}
      />
      
      <FunnelStageEditDialog 
        open={editStageDialogOpen}
        onOpenChange={setEditStageDialogOpen}
        stage={stageToEdit}
        onUpdateStage={(updatedStage) => {
          if (selectedFunnel && updatedStage) {
            const isSubStage = updatedStage.parentId !== undefined;
            
            let updatedStages;
            
            if (isSubStage) {
              // Updating a sub-stage
              updatedStages = stages.map(stage => {
                if (stage.subStages) {
                  return {
                    ...stage,
                    subStages: stage.subStages.map(subStage => 
                      subStage.id === updatedStage.id ? updatedStage : subStage
                    )
                  };
                }
                return stage;
              });
            } else {
              // Updating a main stage
              updatedStages = stages.map(stage => 
                stage.id === updatedStage.id ? updatedStage : stage
              );
            }
            
            updateFunnelStages(selectedFunnel.id, updatedStages);
          }
        }}
      />
    </div>
  );
};

export default FunnelManagement;
