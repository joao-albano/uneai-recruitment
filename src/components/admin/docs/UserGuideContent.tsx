
import React, { useState } from 'react';
import SearchHeader from './userGuide/SearchHeader';
import NavigationSidebar from './userGuide/NavigationSidebar';
import SectionDetails from './userGuide/SectionDetails';
import RelatedSections from './userGuide/RelatedSections';
import QuickStartGuide from './userGuide/QuickStartGuide';
import { Card, CardContent } from '@/components/ui/card';
import { useGuideSectionsData } from './data/guideSectionsData';

const UserGuideContent: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>("dashboard");
  
  const guideSections = useGuideSectionsData();

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <SearchHeader />
      
      <div className="grid md:grid-cols-[280px_1fr] gap-6">
        {/* Navigation Menu */}
        <NavigationSidebar 
          guideSections={guideSections} 
          selectedSection={selectedSection} 
          setSelectedSection={setSelectedSection}
        />

        {/* Section Details */}
        <div>
          {selectedSection ? (
            <>
              <SectionDetails
                section={guideSections.find(s => s.id === selectedSection)!}
              />
              
              {/* Related Sections */}
              <RelatedSections
                sections={guideSections}
                currentSection={selectedSection}
                onSelectSection={setSelectedSection}
              />
            </>
          ) : (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Selecione uma seção para ver mais detalhes e ações disponíveis.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Quick Start Guide */}
      <QuickStartGuide />
    </div>
  );
};

export default UserGuideContent;
