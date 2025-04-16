
import { ReactNode } from 'react';

export interface GuideSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  action?: () => void;
  features?: string[];
  steps?: string[];
  tips?: string[];
  benefits?: string[];
  useCases?: string[];
  tags?: string[];
}
