
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SidebarNavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  collapsed 
}) => {
  return (
    <NavLink 
      to={to} 
      className={({isActive}) => cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        collapsed && "justify-center px-2"
      )}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default SidebarNavLink;
