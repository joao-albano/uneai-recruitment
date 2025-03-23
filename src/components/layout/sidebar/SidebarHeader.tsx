
import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onClose: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ 
  collapsed, 
  setCollapsed, 
  onClose 
}) => {
  return (
    <div className="flex h-16 items-center justify-between border-b px-4">
      {!collapsed && <span className="text-xl font-semibold">Menu</span>}
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="lg:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SidebarHeader;
