
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

interface AppLogoProps {
  visible: boolean;
}

const AppLogo: React.FC<AppLogoProps> = ({ visible }) => {
  const { theme } = useTheme();
  
  return (
    <div className="flex items-center gap-2">
      {visible && (
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
      )}
      <Link to="/home" className="flex items-center gap-1 transition-opacity hover:opacity-80">
        <span className="text-lg font-light text-foreground/80">EduCare</span>
      </Link>
    </div>
  );
};

export default AppLogo;
