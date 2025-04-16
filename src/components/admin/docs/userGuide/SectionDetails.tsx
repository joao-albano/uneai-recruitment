
import React from 'react';
import { CheckCircle2, Lightbulb, ArrowRight, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuideSection } from '../types/userGuideTypes';

interface SectionDetailsProps {
  section: GuideSection;
}

const SectionDetails: React.FC<SectionDetailsProps> = ({ section }) => {
  return (
    <Card className="w-full border-l-4 border-l-primary shadow-md">
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center text-primary">
          <section.icon className="mr-3 h-6 w-6" />
          {section.title}
        </CardTitle>
        <CardDescription className="text-base mt-2">
          {section.description}
        </CardDescription>
        {section.tags && (
          <div className="flex flex-wrap gap-2 mt-2">
            {section.tags.map(tag => (
              <Badge key={tag} variant="outline" className="bg-primary/10">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="features">Recursos</TabsTrigger>
            <TabsTrigger value="steps">Como Usar</TabsTrigger>
            {section.tips && <TabsTrigger value="tips">Dicas</TabsTrigger>}
            {section.useCases && <TabsTrigger value="useCases">Casos de Uso</TabsTrigger>}
          </TabsList>

          <TabsContent value="features" className="mt-0">
            {section.features && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium mb-3">Principais recursos:</h3>
                <ul className="space-y-3">
                  {section.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>

          <TabsContent value="steps" className="mt-0">
            {section.steps && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium mb-3">Passo a passo:</h3>
                <ol className="space-y-3">
                  {section.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tips" className="mt-0">
            {section.tips && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium mb-3">Dicas de especialista:</h3>
                <ul className="space-y-3">
                  {section.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <Lightbulb className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>

          <TabsContent value="useCases" className="mt-0">
            {section.useCases && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium mb-3">Aplicações práticas:</h3>
                <ul className="space-y-3">
                  {section.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {section.action && (
          <Button 
            onClick={section.action} 
            className="mt-6 w-full sm:w-auto"
            size="lg"
          >
            Acessar {section.title}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SectionDetails;
