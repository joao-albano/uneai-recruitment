
// Types related to reengagement rules
import { ChannelType } from './common';

export type ReengagementRule = {
  id: string;
  name: string;
  days: number;
  enabled: boolean;
  channels: ChannelType[];
  message: string;
  emotionalTone: 'neutral' | 'urgent' | 'friendly' | 'formal';
  lastTriggered?: Date;
  status: 'active' | 'paused';
  segmentation?: {
    courseInterest?: string[];
    location?: string[];
    ageRange?: [number, number];
    leadSource?: ChannelType[];
  };
};
