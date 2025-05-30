
import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarFooterProps {
  collapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed }) => {
  return (
    <div className="border-t p-4">
      {!collapsed ? (
        <div className="rounded-md bg-muted p-3">
          <h4 className="text-sm font-medium">Une.AI EduCare</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Sistema de prevenção à evasão escolar.
          </p>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs font-bold text-primary-foreground">UA</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarFooter;
