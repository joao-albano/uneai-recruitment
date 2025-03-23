
import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarNavigationGroup from './sidebar/SidebarNavigationGroup';
import SidebarFooter from './sidebar/SidebarFooter';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { isAdmin } = useAuth();
  const [collapsed, setCollapsed] = React.useState(false);
  
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col border-r bg-background transition-all duration-300 lg:static",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        onClose={onClose} 
      />
      
      <ScrollArea className="flex-1">
        <SidebarNavigationGroup 
          collapsed={collapsed} 
          isAdmin={isAdmin} 
        />
      </ScrollArea>
      
      <SidebarFooter collapsed={collapsed} />
    </aside>
  );
};

export default Sidebar;
