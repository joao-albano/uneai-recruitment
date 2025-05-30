
export interface Goal {
  id: string;
  name: string;
  period: string;
  course?: string;
  campus?: string;
  target: number;
  current: number;
  status: 'active' | 'completed' | 'pending';
  category: 'general' | 'course' | 'campus';
}
