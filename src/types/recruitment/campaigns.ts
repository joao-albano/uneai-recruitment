
// Types related to campaigns management
import { ChannelType } from './common';

export type Campaign = {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget?: number;
  channel: ChannelType[];
  performance?: {
    leadsGenerated: number;
    conversion: number;
    cost?: number;
  };
  goal?: {
    targetLeads: number;
    targetConversion: number;
  };
  target?: {
    audience?: string;
    location?: string;
    interests?: string[];
    courses?: string[];
  };
  isAutomated?: boolean;
  content?: {
    strategy: 'ai' | 'manual' | 'templates';
    template: string;
    variables?: string[];
  };
};
