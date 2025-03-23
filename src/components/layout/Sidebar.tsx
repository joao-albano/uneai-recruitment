
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
  X,
  ChevronLeft,
  ChevronRight,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { isAdmin } = useAuth();
  const [collapsed, setCollapsed] = React.useState(false);
  
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
        "fixed inset-y-0 left-0 z-20 flex flex-col border-r bg-background transition-all duration-300 lg:static",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && <span className="text-xl font-semibold">Menu</span>}
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <nav className={cn("px-2 py-4", collapsed && "px-1")}>
          <div className="space-y-1">
            <NavLink 
              to="/dashboard" 
              className={({isActive}) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <BarChart3 className="h-5 w-5" />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
            
            <NavLink 
              to="/upload" 
              className={({isActive}) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <FileUp className="h-5 w-5" />
              {!collapsed && <span>Upload de Dados</span>}
            </NavLink>
            
            <NavLink 
              to="/alerts" 
              className={({isActive}) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <Bell className="h-5 w-5" />
              {!collapsed && <span>Alertas</span>}
            </NavLink>
            
            <NavLink 
              to="/schedule" 
              className={({isActive}) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <Calendar className="h-5 w-5" />
              {!collapsed && <span>Agenda</span>}
            </NavLink>
            
            <NavLink 
              to="/survey" 
              className={({isActive}) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <ClipboardCheck className="h-5 w-5" />
              {!collapsed && <span>Pesquisa Diagnóstica</span>}
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
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <Users className="h-5 w-5" />
              {!collapsed && <span>Alunos</span>}
            </NavLink>
            
            <NavLink 
              to="/model" 
              className={({isActive}) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <Brain className="h-5 w-5" />
              {!collapsed && <span>Modelo de Previsão</span>}
            </NavLink>
            
            {/* Only show Settings link if user is admin */}
            {user.role === 'admin' && (
              <NavLink 
                to="/settings" 
                className={({isActive}) => cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <Settings className="h-5 w-5" />
                {!collapsed && <span>Configurações</span>}
              </NavLink>
            )}
          </div>
        </nav>
      </ScrollArea>
      
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
    </aside>
  );
};

export default Sidebar;
