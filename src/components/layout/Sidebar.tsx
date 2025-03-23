
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  FileUp,
  Bell,
  Calendar,
  ClipboardCheck,
  Users,
  Settings,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { isAdmin } = useAuth();
  
  // Use auth context to get user info
  const user = {
    name: 'Admin',
    email: 'admin@escola.edu',
    role: isAdmin ? 'admin' : 'user',
    initials: 'AD'
  };

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-background transition-transform duration-300 lg:static lg:w-64",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-6">
        <span className="text-xl font-semibold">Menu</span>
        <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <nav className="px-2 py-4">
          <div className="space-y-1">
            <NavLink 
              to="/dashboard" 
              className={({isActive}) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </NavLink>
            
            <NavLink 
              to="/upload" 
              className={({isActive}) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <FileUp className="h-5 w-5" />
              <span>Upload de Dados</span>
            </NavLink>
            
            <NavLink 
              to="/alerts" 
              className={({isActive}) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Bell className="h-5 w-5" />
              <span>Alertas</span>
            </NavLink>
            
            <NavLink 
              to="/schedule" 
              className={({isActive}) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Calendar className="h-5 w-5" />
              <span>Agenda</span>
            </NavLink>
            
            <NavLink 
              to="/survey" 
              className={({isActive}) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <ClipboardCheck className="h-5 w-5" />
              <span>Pesquisa Diagnóstica</span>
            </NavLink>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-1">
            <NavLink 
              to="/students" 
              className={({isActive}) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Users className="h-5 w-5" />
              <span>Alunos</span>
            </NavLink>
            
            {/* Only show Settings link if user is admin */}
            {user.role === 'admin' && (
              <NavLink 
                to="/settings" 
                className={({isActive}) => cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Settings className="h-5 w-5" />
                <span>Configurações</span>
              </NavLink>
            )}
          </div>
        </nav>
      </ScrollArea>
      
      <div className="border-t p-4">
        <div className="rounded-md bg-muted p-3">
          <h4 className="text-sm font-medium">Une.AI EduCare</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Sistema de prevenção à evasão escolar.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
