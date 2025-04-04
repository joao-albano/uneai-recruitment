
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Campaign, ChannelType } from '@/types/recruitment';
import { toast } from '@/hooks/use-toast';

export type CampaignFormValues = {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  budget?: number;
  channels: ChannelType[];
  audience?: string;
  location?: string;
  courses?: string[];
  isAutomated?: boolean;
};

export const useCampaignForm = (campaign: Campaign, onSave: (campaign: Campaign) => void) => {
  // Initialize with empty array if channel is null or undefined
  const initialChannels = campaign.channel || [];
  const initialCourses = campaign?.target?.courses || [];
  
  const [selectedChannels, setSelectedChannels] = useState<ChannelType[]>(initialChannels);
  const [selectedCourses, setSelectedCourses] = useState<string[]>(initialCourses);
  
  const form = useForm<CampaignFormValues>({
    defaultValues: {
      name: campaign.name || '',
      description: campaign.description || '',
      startDate: campaign.startDate ? new Date(campaign.startDate).toISOString().split('T')[0] : '',
      endDate: campaign.endDate ? new Date(campaign.endDate).toISOString().split('T')[0] : '',
      budget: campaign.budget,
      channels: initialChannels,
      audience: campaign.target?.audience || '',
      location: campaign.target?.location || '',
      courses: initialCourses,
      isAutomated: campaign.isAutomated || false
    }
  });

  const toggleChannel = (channel: ChannelType) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter(c => c !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  const toggleCourse = (course: string) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter(c => c !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleSave = (data: CampaignFormValues) => {
    const updatedCampaign: Campaign = {
      ...campaign,
      name: data.name,
      description: data.description,
      startDate: data.startDate ? new Date(data.startDate) : new Date(),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      budget: data.budget,
      channel: selectedChannels,
      target: {
        audience: data.audience,
        location: data.location,
        courses: selectedCourses
      },
      isAutomated: data.isAutomated
    };

    onSave(updatedCampaign);
    
    toast({
      title: 'Campanha atualizada',
      description: 'A campanha foi atualizada com sucesso.'
    });
  };

  return {
    form,
    selectedChannels,
    selectedCourses,
    toggleChannel,
    toggleCourse,
    handleSave
  };
};
