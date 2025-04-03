
import React from 'react';
import { useLeadsManagement } from './hooks/useLeadsManagement';
import LeadsHeader from './components/LeadsHeader';
import LeadsTabs from './components/LeadsTabs';
import LeadMainContent from './components/LeadMainContent';
import LeadDialogs from './components/LeadDialogs';

const LeadsManagement: React.FC = () => {
  const {
    openDialog,
    setOpenDialog,
    viewMode,
    setViewMode,
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    selectedLead,
    editDialogOpen,
    setEditDialogOpen,
    stageDialogOpen,
    setStageDialogOpen,
    historyDialogOpen,
    setHistoryDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    filteredLeads,
    stageGroups,
    handleEditLead,
    handleChangeStage,
    openChangeStageDialog,
    handleViewHistory,
    handleDeleteLead,
    handleSaveLead,
    handleSaveStage,
    handleConfirmDelete,
    clearFilters,
    handleExportLeads,
    getLeadCounts,
    handleLeadCreated
  } = useLeadsManagement();
  
  return (
    <div className="container mx-auto py-6">
      <LeadsHeader onOpenDialog={() => setOpenDialog(true)} />
      
      <LeadsTabs 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter}
        counts={getLeadCounts()}
      />
      
      <LeadMainContent 
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        exportLeads={handleExportLeads}
        filteredLeads={filteredLeads}
        stageGroups={stageGroups}
        onEditLead={handleEditLead}
        onChangeStage={handleChangeStage}
        onViewHistory={handleViewHistory}
        onDeleteLead={handleDeleteLead}
        onStageChange={handleSaveStage}
        openChangeStageDialog={openChangeStageDialog}
      />
      
      <LeadDialogs 
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedLead={selectedLead}
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        stageDialogOpen={stageDialogOpen}
        setStageDialogOpen={setStageDialogOpen}
        historyDialogOpen={historyDialogOpen}
        setHistoryDialogOpen={setHistoryDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        onSaveLead={handleSaveLead}
        onSaveStage={handleSaveStage}
        onConfirmDelete={handleConfirmDelete}
        onLeadCreated={handleLeadCreated}
      />
    </div>
  );
};

export default LeadsManagement;
