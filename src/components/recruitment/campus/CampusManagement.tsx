
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Upload, List } from 'lucide-react';
import CampusHeader from './CampusHeader';
import CampusList from './CampusList';
import CampusImport from './CampusImport';

const CampusManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('list');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefreshList = () => {
    setRefreshTrigger(prev => prev + 1);
    setActiveTab('list');
  };

  return (
    <div className="container mx-auto py-6">
      <CampusHeader />
      
      <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="mb-6">
          <TabsTrigger value="list" className="gap-2">
            <List className="h-4 w-4" />
            Listar Unidades
          </TabsTrigger>
          <TabsTrigger value="import" className="gap-2">
            <Upload className="h-4 w-4" />
            Importar
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <CampusList key={refreshTrigger} />
        </TabsContent>
        
        <TabsContent value="import">
          <CampusImport onImportSuccess={handleRefreshList} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampusManagement;
