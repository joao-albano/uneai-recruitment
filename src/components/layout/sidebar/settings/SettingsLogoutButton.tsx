
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth';

interface SettingsLogoutButtonProps {
  collapsed: boolean;
}

const SettingsLogoutButton: React.FC<SettingsLogoutButtonProps> = ({ collapsed }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // No need to check the return value here as we're redirecting anyway
  };

  return (
    <Link to="/login" className="w-full">
      <Button 
        variant="ghost" 
        className={cn(
          "w-full justify-start px-2 my-1 gap-3", 
          collapsed && "justify-center p-2"
        )}
        onClick={handleLogout}
      >
        <LogOut className="h-5 w-5" />
        {!collapsed && <span>Sair</span>}
      </Button>
    </Link>
  );
};

export default SettingsLogoutButton;
