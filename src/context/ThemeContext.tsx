
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

type Theme = 'light' | 'dark';
type Language = 'pt-BR' | 'en-US';

interface ThemeContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to get theme from localStorage on initial load
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'light';
  });
  
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage on initial load
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'pt-BR';
  });

  // Apply theme to the document when it changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      toast({
        title: language === 'pt-BR' ? 'Tema alterado' : 'Theme changed',
        description: language === 'pt-BR' 
          ? `Tema alterado para ${newTheme === 'dark' ? 'escuro' : 'claro'}`
          : `Theme changed to ${newTheme} mode`,
      });
      return newTheme;
    });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    toast({
      title: lang === 'pt-BR' ? 'Idioma alterado' : 'Language changed',
      description: lang === 'pt-BR' 
        ? 'Idioma alterado para Português (BR)'
        : 'Language changed to English',
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, language, toggleTheme, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
