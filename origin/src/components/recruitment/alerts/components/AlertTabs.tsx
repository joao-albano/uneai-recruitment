
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AlertCard from './AlertCard';
import EmptyState from './EmptyState';
import { Alert } from '@/types/alert';

interface AlertTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadCount: number;
  readCount: number;
  totalCount: number;
  searchTerm?: string;
}

const AlertTabs: React.FC<AlertTabsProps> = ({
  activeTab,
  setActiveTab,
  unreadCount,
  readCount,
  totalCount,
  searchTerm = ''
}) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="all">
          Todos ({totalCount})
        </TabsTrigger>
        <TabsTrigger value="unread">
          Não Lidos ({unreadCount})
        </TabsTrigger>
        <TabsTrigger value="read">
          Lidos ({readCount})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AlertTabs;
