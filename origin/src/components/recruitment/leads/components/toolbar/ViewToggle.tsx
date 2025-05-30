
import React from 'react';
import { Button } from '@/components/ui/button';
import { List, LayoutGrid } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'table' | 'kanban';
  onViewModeChange: (mode: 'table' | 'kanban') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center border rounded-md overflow-hidden">
      <Button 
        variant={viewMode === 'table' ? 'default' : 'ghost'} 
        size="sm" 
        className="rounded-none px-3"
        onClick={() => onViewModeChange('table')}
      >
        <List className="h-4 w-4 mr-1" />
        Lista
      </Button>
      <Button 
        variant={viewMode === 'kanban' ? 'default' : 'ghost'} 
        size="sm" 
        className="rounded-none px-3"
        onClick={() => onViewModeChange('kanban')}
      >
        <LayoutGrid className="h-4 w-4 mr-1" />
        Kanban
      </Button>
    </div>
  );
};

export default ViewToggle;
