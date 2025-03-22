
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, LogOut, User, Settings, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/context/DataContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { alerts } = useData();
  const unreadAlerts = alerts.filter(alert => !alert.read).length;
  const navigate = useNavigate();
  
  // In a real app, this would come from authentication state
  const user = {
    name: 'Admin',
    email: 'admin@escola.edu',
    role: 'admin', // 'admin' or 'user'
    initials: 'AD'
  };

  const handleLogout = () => {
    // In a real app, this would handle actual logout logic
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur transition-all">
      <Button
        variant="ghost"
        size="icon"
        className="mr-2 lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary/10">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm font-semibold">U</span>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-1 transition-opacity hover:opacity-80">
            <span className="text-lg font-bold">Une.AI</span>
            <span className="text-lg font-light text-foreground/80">EduCare</span>
          </Link>
        </div>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <Link to="/alerts" className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadAlerts > 0 && (
              <Badge 
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive p-0 text-[10px] text-destructive-foreground"
              >
                {unreadAlerts}
              </Badge>
            )}
          </Button>
        </Link>
        
        <div className="h-8 w-px bg-border/50" />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative flex items-center gap-2 cursor-pointer hover:opacity-80">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Meu Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            {user.role === 'admin' && (
              <DropdownMenuItem onClick={() => navigate('/users')}>
                <UserCog className="mr-2 h-4 w-4" />
                <span>Gerenciar Usuários</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
