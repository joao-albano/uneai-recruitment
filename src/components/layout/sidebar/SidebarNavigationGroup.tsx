
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarNavigationGroupProps {
  title: string;
  collapsed: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const SidebarNavigationGroup: React.FC<SidebarNavigationGroupProps> = ({
  title,
  collapsed,
  defaultOpen = false,
  children
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  const toggleOpen = () => {
    if (!collapsed) {
      setIsOpen(!isOpen);
    }
  };
  
  return (
    <div className="py-2">
      {!collapsed ? (
        <GroupHeader 
          title={title} 
          isOpen={isOpen} 
          toggleOpen={toggleOpen} 
        />
      ) : null}
      
      {(isOpen || collapsed) && (
        <GroupContent>{children}</GroupContent>
      )}
    </div>
  );
};

// Internal component for the group header with toggle functionality
const GroupHeader = ({ 
  title, 
  isOpen, 
  toggleOpen 
}: { 
  title: string; 
  isOpen: boolean; 
  toggleOpen: () => void;
}) => (
  <button
    onClick={toggleOpen}
    className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium"
  >
    {title}
    <ChevronDown
      className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
    />
  </button>
);

// Internal component for the group content
const GroupContent = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 space-y-1">
    {children}
  </div>
);

export default SidebarNavigationGroup;
