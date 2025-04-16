
import React, { useState } from 'react';
import { 
  Book, 
  BarChart2, 
  Users, 
  Filter, 
  Clock, 
  Megaphone, 
  Bell, 
  MessageCircle, 
  Calendar, 
  Upload, 
  Settings 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface GuideSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  action?: () => void;
}

const UserGuideContent: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const guideSections: GuideSection[] = [
    {
      id: 'dashboard',
      title: 'Dashboard Inteligente',
      description: 'Visualize métricas e indicadores de performance em tempo real',
      icon: BarChart2,
      action: () => navigate('/recruitment')
    },
    {
      id: 'leads',
      title: 'Gestão de Leads',
      description: 'Acompanhe e gerencie leads de forma organizada e eficiente',
      icon: Users,
      action: () => navigate('/recruitment/leads')
    },
    {
      id: 'funnel',
      title: 'Funil de Captação',
      description: 'Visualize e otimize cada etapa do processo de captação',
      icon: Filter,
      action: () => navigate('/recruitment/funnel')
    },
    {
      id: 'campaigns',
      title: 'Campanhas',
      description: 'Crie e gerencie campanhas de captação automatizadas',
      icon: Megaphone,
      action: () => navigate('/recruitment/campaigns')
    }
  ];

  const renderSectionDetails = (section: GuideSection) => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <section.icon className="mr-2" />
          {section.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{section.description}</p>
        {section.action && (
          <Button onClick={section.action}>
            Acessar {section.title}
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Guia do Usuário - Sistema de Captação</h1>
      
      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          {guideSections.map((section) => (
            <Button
              key={section.id}
              variant={selectedSection === section.id ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => setSelectedSection(section.id)}
            >
              <section.icon className="mr-2" />
              {section.title}
            </Button>
          ))}
        </div>

        {/* Section Details */}
        <div>
          {selectedSection ? (
            renderSectionDetails(
              guideSections.find(s => s.id === selectedSection)!
            )
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

      {/* Bottom Section */}
      <div className="mt-8 bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Dica para Iniciantes</h2>
        <p>
          Comece importando seus leads pela seção de Upload, depois configure seu Funil de Captação 
          com as etapas que refletem seu processo atual, e então utilize o Dashboard para acompanhar 
          os resultados.
        </p>
      </div>
    </div>
  );
};

export default UserGuideContent;
