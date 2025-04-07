
import { OmnichannelReportData } from '../data/types';

export interface ChannelData {
  name: string;
  total: number;
  human: number;
  ai: number;
}

export const prepareChannelComparisonData = (data: OmnichannelReportData): ChannelData[] => {
  return [
    {
      name: 'Ligações Ativas',
      total: data.detailedDistribution.phoneActive.total,
      human: data.detailedDistribution.phoneActive.human,
      ai: data.detailedDistribution.phoneActive.ai
    },
    {
      name: 'Ligações Receptivas',
      total: data.detailedDistribution.phoneReceptive.total,
      human: data.detailedDistribution.phoneReceptive.human,
      ai: data.detailedDistribution.phoneReceptive.ai
    },
    {
      name: 'WhatsApp',
      total: data.detailedDistribution.whatsapp.total,
      human: data.detailedDistribution.whatsapp.human,
      ai: data.detailedDistribution.whatsapp.ai
    },
    {
      name: 'E-mail',
      total: data.detailedDistribution.email.total,
      human: data.detailedDistribution.email.human,
      ai: data.detailedDistribution.email.ai
    }
  ];
};

export const calculateTotalsByType = (channelData: ChannelData[]) => {
  const totalHuman = channelData.reduce((sum, channel) => sum + channel.human, 0);
  const totalAI = channelData.reduce((sum, channel) => sum + channel.ai, 0);
  
  return {
    human: totalHuman,
    ai: totalAI
  };
};
