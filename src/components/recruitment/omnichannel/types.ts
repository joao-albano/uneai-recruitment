
export type ChannelType = 'whatsapp' | 'email' | 'voice' | 'sms';
export type ChannelStatus = 'online' | 'limited' | 'offline';

export interface ChannelConfig {
  id: ChannelType;
  name: string;
  enabled: boolean;
  priority: number;
  icon: React.ElementType;
  fallbackTo?: ChannelType;
  responseRate: number;
  averageTime: string;
  status: ChannelStatus;
}
