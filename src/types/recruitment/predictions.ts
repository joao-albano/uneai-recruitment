
// Types related to AI predictions and analytics

export type EnrollmentPrediction = {
  id: string;
  courseId: string;
  courseName: string;
  period: string;
  targetCount: number;
  predictedCount: number;
  confidence: 'alta' | 'media' | 'baixa';
  variance: number;
  riskLevel: 'baixo' | 'medio' | 'alto';
  lastUpdated: Date;
  suggestedActions?: string[];
  leadsByStage?: {
    stageId: string;
    stageName: string;
    count: number;
    convertionProbability: number;
  }[];
};

export type ChannelPerformance = {
  name: string;
  leads: number;
  conversions: number;
  conversionRate: number;
  costPerLead: number;
  totalCost: number;
  roi: number;
};

export type ChannelDistribution = {
  name: string;
  value: number;
  color: string;
};
