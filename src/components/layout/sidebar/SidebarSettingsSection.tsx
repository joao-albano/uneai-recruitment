import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SidebarNavLink from './SidebarNavLink';
import { useAuth } from '@/context/auth';

interface SidebarSettingsSectionProps {
  collapsed: boolean;
}

const SidebarSettingsSection: React.FC<SidebarSettingsSectionProps> = ({ collapsed }) => {
  const { logout } = useAuth();

  return (
    <>
      <SidebarNavLink 
        to="/settings" 
        icon={Settings} 
        label="Configurações" 
        collapsed={collapsed}
      />
      
      <Link to="/login" className="w-full">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start px-2 my-1 gap-3", 
            collapsed && "justify-center p-2"
          )}
          onClick={() => logout()}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Sair</span>}
        </Button>
      </Link>
    </>
  );
};

export default SidebarSettingsSection;
