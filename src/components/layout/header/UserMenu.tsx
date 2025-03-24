
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/context/auth';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    role: string;
    initials: string;
  };
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const navigate = useNavigate();
  const { logout, isAdmin, currentUser, isSuperAdmin } = useAuth();
  
  // Use the name from the authentication context or fall back to the provided user prop
  const displayName = currentUser?.name || user.name;
  const displayEmail = currentUser?.email || user.email;
  const displayInitials = currentUser?.name ? 
    currentUser.name[0].toUpperCase() : 
    (currentUser?.email?.[0] || user.initials).toUpperCase();
  
  // Determine role label based on super admin status
  const roleLabel = isSuperAdmin ? 'Super Admin' : 
                   (currentUser?.role === 'admin' ? 'Administrador' : 'Usuário');
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  const goToProfile = () => {
    navigate('/profile');
  };
  
  const goToSettings = () => {
    navigate('/settings');
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {displayInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{displayEmail}</p>
            {isSuperAdmin && (
              <span className="text-[10px] font-medium text-amber-600 mt-1">
                Super Admin - UNE CX
              </span>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={goToProfile} className="cursor-pointer">
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={goToSettings} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
