
import { useState } from 'react';

export const useLeadViewMode = () => {
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  
  return {
    viewMode,
    setViewMode,
  };
};
