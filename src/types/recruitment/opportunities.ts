
// Types related to opportunity detection and radar

export type OpportunityItem = {
  id: string;
  name: string;
  type: 'course' | 'location' | 'interest';
  count: number;
  urgency: 'high' | 'medium' | 'low';
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  description: string;
  suggestedAction?: string;
  leadIds?: string[]; // IDs dos leads relacionados a esta oportunidade
};

export type AcademicOpportunity = {
  id: string;
  name: string;
  type: 'course' | 'interest' | 'location' | 'financial';
  count: number;
  urgency: 'high' | 'medium' | 'low';
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  description: string;
  suggestedAction?: string;
  leadIds?: string[]; // IDs dos leads relacionados a esta oportunidade
};
