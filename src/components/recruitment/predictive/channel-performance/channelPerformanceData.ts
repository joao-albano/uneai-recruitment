
// Channel performance data
export type ChannelDataType = {
  name: string;
  leads: number;
  enrollment: number;
  conversionRate: number;
  costPerLead: number;
  costPerEnrollment: number;
  targetEnrollment: number;
  predictedEnrollment: number;
  confidence: 'alta' | 'média' | 'baixa';
};

// Mock channel data
export const channelData: ChannelDataType[] = [
  { 
    name: 'WhatsApp', 
    leads: 420, 
    enrollment: 85, 
    conversionRate: 20.2,
    costPerLead: 38.5,
    costPerEnrollment: 190.4,
    targetEnrollment: 90,
    predictedEnrollment: 98,
    confidence: 'alta'
  },
  { 
    name: 'Facebook', 
    leads: 350, 
    enrollment: 52, 
    conversionRate: 14.9,
    costPerLead: 42.3,
    costPerEnrollment: 284.6,
    targetEnrollment: 60,
    predictedEnrollment: 55,
    confidence: 'média'
  },
  { 
    name: 'Google', 
    leads: 280, 
    enrollment: 70, 
    conversionRate: 25.0,
    costPerLead: 50.2,
    costPerEnrollment: 200.8,
    targetEnrollment: 65,
    predictedEnrollment: 72,
    confidence: 'alta'
  },
  { 
    name: 'Email', 
    leads: 180, 
    enrollment: 22, 
    conversionRate: 12.2,
    costPerLead: 25.0,
    costPerEnrollment: 204.5,
    targetEnrollment: 30,
    predictedEnrollment: 24,
    confidence: 'média'
  },
  { 
    name: 'SMS', 
    leads: 95, 
    enrollment: 12, 
    conversionRate: 12.6,
    costPerLead: 18.5,
    costPerEnrollment: 146.8,
    targetEnrollment: 15,
    predictedEnrollment: 13,
    confidence: 'alta'
  },
  { 
    name: 'Eventos', 
    leads: 120, 
    enrollment: 35, 
    conversionRate: 29.2,
    costPerLead: 85.0,
    costPerEnrollment: 291.4,
    targetEnrollment: 30,
    predictedEnrollment: 38,
    confidence: 'alta'
  }
];

// Helper calculations
export const averageCostPerLead = channelData.reduce((sum, item) => sum + item.costPerLead, 0) / channelData.length;
