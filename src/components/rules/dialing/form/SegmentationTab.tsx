
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RuleSegmentation } from '@/types/voicecall';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Dados simulados para o exemplo
const mockCourses = [
  { id: '1', name: 'Administração' },
  { id: '2', name: 'Direito' },
  { id: '3', name: 'Engenharia Civil' },
  { id: '4', name: 'Medicina' },
  { id: '5', name: 'Psicologia' },
  { id: '6', name: 'Sistemas de Informação' },
  { id: '7', name: 'Arquitetura' },
  { id: '8', name: 'Odontologia' },
];

const mockFunnels = [
  { id: '1', name: 'Funil Principal' },
  { id: '2', name: 'Funil de Verão' },
  { id: '3', name: 'Campanha Especial' },
];

const mockFunnelStages = [
  { id: '1', name: 'Novo Lead', funnelId: '1' },
  { id: '2', name: 'Contato Inicial', funnelId: '1' },
  { id: '3', name: 'Agendamento', funnelId: '1' },
  { id: '4', name: 'Visita', funnelId: '1' },
  { id: '5', name: 'Matrícula', funnelId: '1' },
  { id: '6', name: 'Novo Lead', funnelId: '2' },
  { id: '7', name: 'Contato', funnelId: '2' },
  { id: '8', name: 'Conversão', funnelId: '2' },
  { id: '9', name: 'Lead', funnelId: '3' },
  { id: '10', name: 'Oportunidade', funnelId: '3' },
];

interface SegmentationTabProps {
  segmentation: RuleSegmentation;
  updateSegmentation: (field: keyof RuleSegmentation, value: string[] | undefined) => void;
}

const SegmentationTab: React.FC<SegmentationTabProps> = ({
  segmentation,
  updateSegmentation
}) => {
  const [courseSearch, setCourseSearch] = useState('');
  const [funnelSearch, setFunnelSearch] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(mockCourses);
  const [filteredFunnels, setFilteredFunnels] = useState(mockFunnels);
  const [selectedFunnel, setSelectedFunnel] = useState<string | null>(null);
  const [filteredStages, setFilteredStages] = useState(mockFunnelStages);

  // Filtragem de cursos
  useEffect(() => {
    if (courseSearch) {
      setFilteredCourses(
        mockCourses.filter(course => 
          course.name.toLowerCase().includes(courseSearch.toLowerCase())
        )
      );
    } else {
      setFilteredCourses(mockCourses);
    }
  }, [courseSearch]);

  // Filtragem de funis
  useEffect(() => {
    if (funnelSearch) {
      setFilteredFunnels(
        mockFunnels.filter(funnel => 
          funnel.name.toLowerCase().includes(funnelSearch.toLowerCase())
        )
      );
    } else {
      setFilteredFunnels(mockFunnels);
    }
  }, [funnelSearch]);

  // Filtragem de etapas com base no funil selecionado
  useEffect(() => {
    if (selectedFunnel) {
      setFilteredStages(
        mockFunnelStages.filter(stage => stage.funnelId === selectedFunnel)
      );
    } else {
      setFilteredStages(mockFunnelStages);
    }
  }, [selectedFunnel]);

  // Manipuladores para lidar com seleções de checkbox
  const handleCourseToggle = (courseId: string) => {
    const courseIds = segmentation.courseIds || [];
    if (courseIds.includes(courseId)) {
      updateSegmentation('courseIds', courseIds.filter(id => id !== courseId));
    } else {
      updateSegmentation('courseIds', [...courseIds, courseId]);
    }
  };

  const handleFunnelToggle = (funnelId: string) => {
    const funnelIds = segmentation.funnelIds || [];
    if (funnelIds.includes(funnelId)) {
      updateSegmentation('funnelIds', funnelIds.filter(id => id !== funnelId));
      setSelectedFunnel(null);
    } else {
      updateSegmentation('funnelIds', [...funnelIds, funnelId]);
      setSelectedFunnel(funnelId);
    }
  };

  const handleStageToggle = (stageId: string) => {
    const stageIds = segmentation.funnelStageIds || [];
    if (stageIds.includes(stageId)) {
      updateSegmentation('funnelStageIds', stageIds.filter(id => id !== stageId));
    } else {
      updateSegmentation('funnelStageIds', [...stageIds, stageId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Segmente suas regras de discagem para direcionar específicos cursos, funis, ou etapas do funil.
        Deixe em branco para aplicar a regra a todos os itens.
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="funnels">Funis</TabsTrigger>
          <TabsTrigger value="stages">Etapas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses">
          <Card>
            <CardContent className="pt-6 pb-4">
              <div className="mb-4 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cursos..."
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <ScrollArea className="h-60 pr-4">
                <div className="space-y-2">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <div key={course.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`course-${course.id}`} 
                          checked={(segmentation.courseIds || []).includes(course.id)}
                          onCheckedChange={() => handleCourseToggle(course.id)}
                        />
                        <Label 
                          htmlFor={`course-${course.id}`}
                          className="cursor-pointer"
                        >
                          {course.name}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      Nenhum curso encontrado
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="funnels">
          <Card>
            <CardContent className="pt-6 pb-4">
              <div className="mb-4 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar funis..."
                  value={funnelSearch}
                  onChange={(e) => setFunnelSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <ScrollArea className="h-60 pr-4">
                <div className="space-y-2">
                  {filteredFunnels.length > 0 ? (
                    filteredFunnels.map((funnel) => (
                      <div key={funnel.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`funnel-${funnel.id}`} 
                          checked={(segmentation.funnelIds || []).includes(funnel.id)}
                          onCheckedChange={() => handleFunnelToggle(funnel.id)}
                        />
                        <Label 
                          htmlFor={`funnel-${funnel.id}`}
                          className="cursor-pointer"
                        >
                          {funnel.name}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      Nenhum funil encontrado
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stages">
          <Card>
            <CardContent className="pt-6 pb-4">
              <div className="mb-2 text-sm text-muted-foreground">
                {selectedFunnel 
                  ? `Mostrando etapas do funil selecionado` 
                  : `Selecione um funil na aba "Funis" para filtrar as etapas`}
              </div>
              
              <ScrollArea className="h-60 pr-4">
                <div className="space-y-2">
                  {filteredStages.length > 0 ? (
                    filteredStages.map((stage) => (
                      <div key={stage.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`stage-${stage.id}`} 
                          checked={(segmentation.funnelStageIds || []).includes(stage.id)}
                          onCheckedChange={() => handleStageToggle(stage.id)}
                        />
                        <Label 
                          htmlFor={`stage-${stage.id}`}
                          className="cursor-pointer"
                        >
                          {stage.name}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      {selectedFunnel 
                        ? "Este funil não possui etapas definidas"
                        : "Selecione um funil para ver suas etapas"}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SegmentationTab;
