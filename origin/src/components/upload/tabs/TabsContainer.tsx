
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileSpreadsheet, History, Info } from 'lucide-react';
import UploadForm from '@/components/upload/UploadForm';
import UploadHistory from '@/components/upload/UploadHistory';
import InfoTabContent from './InfoTabContent';

interface TabsContainerProps {
  defaultTab?: string;
}

const TabsContainer: React.FC<TabsContainerProps> = ({ defaultTab = 'upload' }) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="upload" className="gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          Upload
        </TabsTrigger>
        <TabsTrigger value="history" className="gap-2">
          <History className="h-4 w-4" />
          Histórico
        </TabsTrigger>
        <TabsTrigger value="info" className="gap-2">
          <Info className="h-4 w-4" />
          Informações
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="upload">
        <UploadForm />
      </TabsContent>
      
      <TabsContent value="history">
        <UploadHistory />
      </TabsContent>
      
      <TabsContent value="info">
        <InfoTabContent />
      </TabsContent>
    </Tabs>
  );
};

export default TabsContainer;
