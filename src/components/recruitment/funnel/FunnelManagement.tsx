
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, Settings, Save, ArrowLeft, ArrowRight, 
  UserPlus, Calendar, School, Check, MoreHorizontal,
  Pencil, Trash2
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import FunnelStageDialog from './FunnelStageDialog';

// Tipo para as etapas do funil
interface FunnelStage {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
  actions: string[];
  order: number;
}

const FunnelManagement: React.FC = () => {
  const [openStageDialog, setOpenStageDialog] = useState(false);
  const [editingStage, setEditingStage] = useState<FunnelStage | null>(null);
  
  // Etapas do funil de exemplo
  const [stages, setStages] = useState<FunnelStage[]>([
    {
      id: '1',
      name: 'Contato Inicial',
      color: 'bg-blue-500',
      icon: <UserPlus className="h-5 w-5" />,
      actions: ['Telefonema', 'E-mail', 'WhatsApp'],
      order: 1
    },
    {
      id: '2',
      name: 'Agendamento',
      color: 'bg-amber-500',
      icon: <Calendar className="h-5 w-5" />,
      actions: ['Agendar Visita', 'Confirmar Horário', 'Lembrete'],
      order: 2
    },
    {
      id: '3',
      name: 'Visita',
      color: 'bg-purple-500',
      icon: <School className="h-5 w-5" />,
      actions: ['Tour pela escola', 'Apresentação', 'Material informativo'],
      order: 3
    },
    {
      id: '4',
      name: 'Matrícula',
      color: 'bg-green-500',
      icon: <Check className="h-5 w-5" />,
      actions: ['Contrato', 'Documentação', 'Pagamento'],
      order: 4
    }
  ]);
  
  // Manipuladores de edição de etapas
  const handleEditStage = (stage: FunnelStage) => {
    setEditingStage(stage);
    setOpenStageDialog(true);
  };
  
  const handleAddStage = () => {
    setEditingStage(null);
    setOpenStageDialog(true);
  };
  
  const handleSaveStage = (stage: FunnelStage) => {
    if (editingStage) {
      // Atualizar etapa existente
      setStages(prev => prev.map(s => s.id === stage.id ? stage : s));
    } else {
      // Adicionar nova etapa
      const newStage = {
        ...stage,
        id: `${Date.now()}`,
        order: stages.length + 1
      };
      setStages(prev => [...prev, newStage]);
    }
    setOpenStageDialog(false);
  };
  
  const handleMoveStage = (id: string, direction: 'left' | 'right') => {
    const currentStages = [...stages];
    const index = currentStages.findIndex(s => s.id === id);
    
    if (direction === 'left' && index > 0) {
      // Trocar com a etapa anterior
      [currentStages[index - 1], currentStages[index]] = [currentStages[index], currentStages[index - 1]];
      // Atualizar ordem
      currentStages[index - 1].order = index;
      currentStages[index].order = index + 1;
    } else if (direction === 'right' && index < currentStages.length - 1) {
      // Trocar com a etapa seguinte
      [currentStages[index], currentStages[index + 1]] = [currentStages[index + 1], currentStages[index]];
      // Atualizar ordem
      currentStages[index].order = index + 1;
      currentStages[index + 1].order = index + 2;
    }
    
    setStages(currentStages);
  };
  
  const handleDeleteStage = (id: string) => {
    const confirmed = window.confirm("Tem certeza que deseja excluir esta etapa?");
    if (confirmed) {
      setStages(prev => prev.filter(s => s.id !== id));
    }
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Funil de Captação</h1>
          <p className="text-muted-foreground">
            Configure as etapas do funil de captação para seu processo
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            <span>Configurações</span>
          </Button>
          <Button 
            className="gap-2"
            onClick={handleAddStage}
          >
            <Plus className="h-4 w-4" />
            <span>Nova Etapa</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="edit" className="mb-6">
        <TabsList>
          <TabsTrigger value="edit">Editor de Funil</TabsTrigger>
          <TabsTrigger value="preview">Visualização</TabsTrigger>
          <TabsTrigger value="templates">Modelos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuração do Funil</CardTitle>
              <CardDescription>
                Adicione, edite ou reordene as etapas do seu funil de captação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stages.map((stage, index) => (
                  <Card key={stage.id} className="border-t-4" style={{ borderTopColor: stage.color.replace('bg-', '') }}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${stage.color}`}>
                            {stage.icon}
                          </div>
                          <CardTitle className="text-lg font-medium">{stage.name}</CardTitle>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditStage(stage)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMoveStage(stage.id, 'left')} disabled={index === 0}>
                              <ArrowLeft className="h-4 w-4 mr-2" />
                              Mover para Esquerda
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMoveStage(stage.id, 'right')} disabled={index === stages.length - 1}>
                              <ArrowRight className="h-4 w-4 mr-2" />
                              Mover para Direita
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteStage(stage.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">Ações nesta etapa:</p>
                      <ul className="text-sm space-y-1 list-disc pl-5">
                        {stage.actions.map((action, idx) => (
                          <li key={idx}>{action}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  <span>Salvar Funil</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Visualização do Funil</CardTitle>
              <CardDescription>
                Veja como o funil ficará em produção
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center border rounded">
                <p className="text-muted-foreground">Visualização do funil em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Modelos de Funil</CardTitle>
              <CardDescription>
                Selecione um modelo pré-configurado para seu tipo de instituição
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover:border-primary cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">Escola Básica</CardTitle>
                    <CardDescription>
                      Para escolas de educação infantil e ensino fundamental
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      4 etapas personalizadas para o processo de captação escolar
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:border-primary cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">Ensino Superior</CardTitle>
                    <CardDescription>
                      Para faculdades e universidades
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      6 etapas focadas em processo seletivo e matrícula
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:border-primary cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">Cursos Livres</CardTitle>
                    <CardDescription>
                      Para escolas de idiomas e cursos profissionalizantes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      5 etapas com ênfase em demonstração e conversão rápida
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <FunnelStageDialog 
        open={openStageDialog} 
        onOpenChange={setOpenStageDialog}
        stage={editingStage}
        onSave={handleSaveStage}
      />
    </div>
  );
};

export default FunnelManagement;
