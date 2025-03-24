
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, UserCog, Building, DollarSign } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

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
  const { logout, isAdmin, isSuperAdmin, currentOrganization } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
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
        <div className="flex flex-col space-y-1 p-2">
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
          {currentOrganization && (
            <Badge 
              variant="outline" 
              className={cn(
                "mt-1 justify-start",
                isSuperAdmin ? "bg-amber-50 text-amber-700 border-amber-200" : ""
              )}
            >
              <Building className="h-3 w-3 mr-1" />
              {currentOrganization.name}
              {isSuperAdmin && " (UNE CX)"}
            </Badge>
          )}
        </div>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Meu Perfil</span>
        </DropdownMenuItem>
        
        {isAdmin && (
          <>
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Administração
            </DropdownMenuLabel>
            
            <DropdownMenuItem onClick={() => navigate('/users')}>
              <UserCog className="mr-2 h-4 w-4" />
              <span>Gerenciar Usuários</span>
            </DropdownMenuItem>
            
            {isSuperAdmin && (
              <>
                <DropdownMenuItem onClick={() => navigate('/admin/organizations')}>
                  <Building className="mr-2 h-4 w-4" />
                  <span>Organizações</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => navigate('/admin/plans')}>
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>Planos</span>
                </DropdownMenuItem>
              </>
            )}
            
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Função de utilitário para concatenar classes condicionalmente
const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export default UserMenu;
