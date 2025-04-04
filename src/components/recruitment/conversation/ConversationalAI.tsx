
import React from 'react';
import { Card } from '@/components/ui/card';
import { useConversationData } from './hooks/useConversationData';
import ConversationEmptyState from './ConversationEmptyState';
import ConversationSidebar from './ConversationSidebar';
import ConversationChatArea from './ConversationChatArea';
import ConversationalAIHeader from './ConversationalAIHeader';
import ConversationSettingsDialog from './ConversationSettingsDialog';
import ConversationFiltersDialog from './ConversationFiltersDialog';
import NewConversationDialog from './NewConversationDialog';

const ConversationalAI: React.FC = () => {
  const {
    activeChannel,
    setActiveChannel,
    isAiMode,
    setIsAiMode,
    showAnalytics,
    setShowAnalytics,
    settingsOpen,
    setSettingsOpen,
    filtersOpen,
    setFiltersOpen,
    newConversationOpen,
    setNewConversationOpen,
    selectedConversationId,
    conversations,
    agents,
    getSelectedConversation,
    getSelectedMessages,
    handleSendMessage,
    handleSelectConversation,
    handleToggleAiMode,
    handleToggleAnalytics,
    handleOpenSettings,
    handleStartNewConversation,
    handleCreateNewConversation
  } = useConversationData();

  const selectedConversation = getSelectedConversation();

  return (
    <div className="flex flex-col">
      <ConversationalAIHeader
        onOpenFilters={() => setFiltersOpen(true)}
        onOpenSettings={handleOpenSettings}
      />

      <Card className="h-[75vh] flex">
        <ConversationSidebar
          conversations={conversations}
          agents={agents}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
        />
        
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <ConversationChatArea
              selectedConversation={selectedConversation}
              isAiMode={isAiMode}
              showAnalytics={showAnalytics}
              activeChannel={activeChannel}
              setActiveChannel={setActiveChannel}
              handleToggleAiMode={handleToggleAiMode}
              handleToggleAnalytics={handleToggleAnalytics}
              handleOpenSettings={handleOpenSettings}
              handleSendMessage={handleSendMessage}
              messages={getSelectedMessages()}
            />
          ) : (
            <ConversationEmptyState
              onStartNewConversation={handleStartNewConversation}
            />
          )}
        </div>
      </Card>
      
      <ConversationSettingsDialog 
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        showAnalytics={showAnalytics}
        onToggleAnalytics={setShowAnalytics}
        isAiMode={isAiMode}
        onToggleAiMode={setIsAiMode}
      />
      
      <ConversationFiltersDialog 
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApplyFilters={(filters) => {
          console.log('Applied filters:', filters);
          setFiltersOpen(false);
        }}
      />
      
      <NewConversationDialog
        open={newConversationOpen}
        onClose={() => setNewConversationOpen(false)}
        onCreateConversation={handleCreateNewConversation}
      />
    </div>
  );
};

export default ConversationalAI;
