
// Mock data for channel performance and distributions

export const channelData = [
  { 
    name: 'WhatsApp', 
    leads: 320, 
    conversions: 78,
    conversionRate: 24.5,
    costPerLead: 32.5,
    totalCost: 10400,
    roi: 3.8,
    targetEnrollment: 90,
    predictedEnrollment: 78,
    confidence: 'alta' as 'alta'
  },
  { 
    name: 'Facebook', 
    leads: 280, 
    conversions: 52,
    conversionRate: 18.7,
    costPerLead: 28.2,
    totalCost: 7896,
    roi: 2.6,
    targetEnrollment: 65,
    predictedEnrollment: 52,
    confidence: 'media' as 'media'
  },
  { 
    name: 'Google', 
    leads: 420, 
    conversions: 94,
    conversionRate: 22.3,
    costPerLead: 35.8,
    totalCost: 15036,
    roi: 2.9,
    targetEnrollment: 105,
    predictedEnrollment: 94,
    confidence: 'alta' as 'alta'
  },
  { 
    name: 'Email', 
    leads: 180, 
    conversions: 27,
    conversionRate: 15.1,
    costPerLead: 12.4,
    totalCost: 2232,
    roi: 4.2,
    targetEnrollment: 35,
    predictedEnrollment: 27,
    confidence: 'baixa' as 'baixa'
  },
  { 
    name: 'SMS', 
    leads: 150, 
    conversions: 19,
    conversionRate: 12.8,
    costPerLead: 8.6,
    totalCost: 1290,
    roi: 3.7,
    targetEnrollment: 25,
    predictedEnrollment: 19,
    confidence: 'baixa' as 'baixa'
  },
  { 
    name: 'Eventos', 
    leads: 250, 
    conversions: 71,
    conversionRate: 28.5,
    costPerLead: 52.3,
    totalCost: 13075,
    roi: 2.1,
    targetEnrollment: 80,
    predictedEnrollment: 71,
    confidence: 'alta' as 'alta'
  },
];

// Helper function to get consistent colors for channels
export function getChannelColor(channelName: string): string {
  switch (channelName) {
    case 'WhatsApp': return '#25D366';
    case 'Facebook': return '#1877F2';
    case 'Google': return '#4285F4';
    case 'Email': return '#DB4437';
    case 'SMS': return '#7E8A97';
    case 'Eventos': return '#8B5CF6';
    default: return '#6B7280';
  }
}
