
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const AuthLogo = () => {
  const { theme } = useTheme();
  
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="h-16 w-auto mb-4 relative">
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
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <span className="text-2xl font-light">EduCare</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Sistema de prevenção à evasão escolar
        </p>
      </div>
    </div>
  );
};

export default AuthLogo;
