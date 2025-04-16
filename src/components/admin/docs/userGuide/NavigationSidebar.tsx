
import React from 'react';
import { Book, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { GuideSection } from '../types/userGuideTypes';

interface NavigationSidebarProps {
  guideSections: GuideSection[];
  selectedSection: string | null;
  setSelectedSection: (id: string) => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ 
  guideSections, 
  selectedSection, 
  setSelectedSection 
}) => {
  return (
    <div className="space-y-2 bg-card rounded-lg p-4 shadow-sm border h-fit sticky top-6">
      <h2 className="font-semibold mb-4 px-2 flex items-center">
        <Book className="mr-2 h-5 w-5 text-primary" />
        Navegação Rápida
      </h2>
      
      <div className="space-y-1">
        {guideSections.map((section) => (
          <Button
            key={section.id}
            variant={selectedSection === section.id ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setSelectedSection(section.id)}
          >
            <section.icon className="mr-2 h-5 w-5" />
            <span className="truncate">{section.title}</span>
          </Button>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md">
        <h3 className="font-medium flex items-center text-amber-700 dark:text-amber-400">
          <HelpCircle className="h-4 w-4 mr-2" />
          Precisa de ajuda?
        </h3>
        <p className="text-sm mt-2 text-amber-800/70 dark:text-amber-300/70">
          Entre em contato com nosso suporte técnico para orientações adicionais sobre o sistema.
        </p>
      </div>
    </div>
  );
};

export default NavigationSidebar;
