
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SidebarNavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
  isActive?: boolean;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  collapsed,
  isActive: propIsActive
}) => {
  const location = useLocation();
  
  // Determina se o link está ativo
  const isActive = propIsActive !== undefined 
    ? propIsActive 
    : location.pathname === to || 
      // Adicionar verificação para a rota inicial do produto de captação
      (to === "/recruitment" && location.pathname === "/recruitment");
  
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        collapsed && "justify-center px-2"
      )}
      replace={false}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

export default SidebarNavLink;
