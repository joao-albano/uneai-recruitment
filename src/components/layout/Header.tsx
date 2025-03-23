import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, LogOut, User, Settings, UserCog, DollarSign } from 'lucide-react';
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
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarCollapsed }) => {
  const navigate = useNavigate();
  const { isAdmin, logout, userEmail } = useAuth();
  const { theme } = useTheme();
  
  let alerts = [];
  try {
    const dataContext = useData();
    alerts = dataContext.alerts || [];
  } catch (error) {
    console.log("DataProvider not available, using fallback for alerts");
  }
  
  const unreadAlerts = Array.isArray(alerts) ? alerts.filter(alert => !alert.read).length : 0;
  
  const user = {
    name: isAdmin ? 'Admin' : 'Usuário',
    email: userEmail || (isAdmin ? 'admin@escola.edu' : 'user@escola.edu'),
    role: isAdmin ? 'admin' : 'user',
    initials: isAdmin ? 'AD' : 'US'
  };

  const handleLogout = () => {
    logout();
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
      
      {(sidebarCollapsed || window.innerWidth < 1024) && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-auto">
              {theme === 'dark' ? (
                <img 
                  src="/lovable-uploads/d2557391-afc4-4f36-9029-1e3ddd3c3793.png" 
                  alt="Une.AI (Modo Escuro)" 
                  className="h-full w-auto object-contain"
                />
              ) : (
                <img 
                  src="/lovable-uploads/0992bc45-19cb-47ac-a913-96b95b006ee5.png" 
                  alt="Une.AI" 
                  className="h-full w-auto object-contain"
                />
              )}
            </div>
            <Link to="/home" className="flex items-center gap-1 transition-opacity hover:opacity-80">
              <span className="text-lg font-light text-foreground/80">EduCare</span>
            </Link>
          </div>
        </div>
      )}
      
      <div className="ml-auto flex items-center gap-4">
        <Link to="/pricing">
          <Button variant="ghost" size="sm" className="gap-1">
            <DollarSign className="h-4 w-4" />
            <span>Planos</span>
          </Button>
        </Link>
        
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
            
            {user.role === 'admin' && (
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
            )}
            
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
