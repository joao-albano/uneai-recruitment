
import React, { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import SidebarContent from './sidebar/SidebarContent';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  collapsed,
  setCollapsed,
}) => {
  const { currentUser } = useAuth();
  const [sidebarWidth, setSidebarWidth] = useState(collapsed ? 80 : 280);
  
  const handleToggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    setSidebarWidth(newCollapsed ? 80 : 280);
  };

  // Desktop sidebar
  const desktopSidebar = (
    <div
      className={cn(
        "hidden md:block h-full border-r transition-all duration-300",
        collapsed ? "w-20" : "w-70"
      )}
      style={{ width: `${sidebarWidth}px` }}
    >
      <SidebarContent 
        collapsed={collapsed} 
        onToggleCollapse={handleToggleCollapse} 
        onClose={onClose} 
        sidebarWidth={sidebarWidth}
        currentUser={currentUser}
      />
    </div>
  );
  
  // Mobile sidebar (Sheet)
  const mobileSidebar = (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0 border-r max-w-[280px]">
        <SidebarContent 
          collapsed={collapsed} 
          onToggleCollapse={handleToggleCollapse} 
          onClose={onClose} 
          sidebarWidth={sidebarWidth}
          currentUser={currentUser}
        />
      </SheetContent>
    </Sheet>
  );
  
  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
};

export default Sidebar;
