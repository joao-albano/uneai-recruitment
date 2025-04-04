
import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Campaign } from '@/types/recruitment';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BasicInfoTab from './tabs/BasicInfoTab';
import ChannelsTab from './tabs/ChannelsTab';
import TargetingTab from './tabs/TargetingTab';
import { useCampaignForm } from './hooks/useCampaignForm';

interface CampaignEditFormProps {
  campaign: Campaign;
  onSave: (campaign: Campaign) => void;
  onCancel: () => void;
}

const CampaignEditForm: React.FC<CampaignEditFormProps> = ({
  campaign,
  onSave,
  onCancel
}) => {
  const { 
    form, 
    selectedChannels, 
    selectedCourses, 
    toggleChannel, 
    toggleCourse,
    handleSave 
  } = useCampaignForm(campaign, onSave);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="channels">Canais</TabsTrigger>
            <TabsTrigger value="targeting">Segmentação</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <BasicInfoTab form={form} />
          </TabsContent>
          
          <TabsContent value="channels" className="space-y-4">
            <ChannelsTab 
              selectedChannels={selectedChannels} 
              toggleChannel={toggleChannel} 
            />
          </TabsContent>
          
          <TabsContent value="targeting" className="space-y-4">
            <TargetingTab 
              form={form} 
              selectedCourses={selectedCourses} 
              toggleCourse={toggleCourse} 
            />
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            Salvar Alterações
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CampaignEditForm;
