
import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

interface SidebarHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onClose: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ 
  collapsed, 
  setCollapsed, 
  onClose 
}) => {
  const { theme } = useTheme();

  return (
    <div className="flex h-16 items-center justify-between border-b px-4">
      {!collapsed && (
        <div className="flex items-center">
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
        </div>
      )}
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
  );
};

export default SidebarHeader;
