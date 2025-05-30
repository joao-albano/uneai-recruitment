
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GuideSection } from '../types/userGuideTypes';

interface RelatedSectionsProps {
  sections: GuideSection[];
  currentSection: string;
  onSelectSection: (id: string) => void;
}

const RelatedSections: React.FC<RelatedSectionsProps> = ({ 
  sections, 
  currentSection, 
  onSelectSection 
}) => {
  const relatedSections = sections
    .filter(s => s.id !== currentSection)
    .slice(0, 3);
    
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Funcionalidades relacionadas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {relatedSections.map(section => (
          <Card 
            key={section.id} 
            className="cursor-pointer hover:border-primary/50 transition-all"
            onClick={() => onSelectSection(section.id)}
          >
            <CardContent className="p-4 flex items-start">
              <section.icon className="h-5 w-5 mr-3 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">{section.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {section.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedSections;
