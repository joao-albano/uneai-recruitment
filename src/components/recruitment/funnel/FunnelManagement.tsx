
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight, Users, ArrowDown, Settings, Filter } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Dados fictícios para demonstração
const funnelStages = [
  { 
    id: '1', 
    name: 'Lead Gerado', 
    order: 1, 
    isActive: true, 
    leadCount: 520, 
    conversionRate: 75,
    expectedDuration: 2,
    description: 'Lead captado através de diversos canais'
  },
  { 
    id: '2', 
    name: 'Primeiro Contato', 
    order: 2, 
    isActive: true, 
    leadCount: 390, 
    conversionRate: 64,
    expectedDuration: 3,
    description: 'Primeiro contato realizado com o lead'
  },
  { 
    id: '3', 
    name: 'Apresentação', 
    order: 3, 
    isActive: true, 
    leadCount: 250, 
    conversionRate: 68,
    expectedDuration: 5,
    description: 'Apresentação da instituição e cursos'
  },
  { 
    id: '4', 
    name: 'Visita', 
    order: 4, 
    isActive: true, 
    leadCount: 170, 
    conversionRate: 65,
    expectedDuration: 7,
    description: 'Visita agendada à instituição'
  },
  { 
    id: '5', 
    name: 'Matrícula', 
    order: 5, 
    isActive: true, 
    leadCount: 110, 
    conversionRate: 100,
    expectedDuration: 2,
    description: 'Processo de matrícula concluído'
  }
];

const FunnelManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Funil de Captação</h1>
          <p className="text-muted-foreground">
            Configure e monitore as etapas do processo de captação
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Configurar
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Etapa
          </Button>
        </div>
      </div>

      {/* Visualização do Funil */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Visualização do Funil</CardTitle>
          <CardDescription>
            Fluxo de conversão e desempenho por etapa
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            {funnelStages.map((stage, index) => (
              <div key={stage.id} className="relative">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="font-bold text-primary">{stage.order}</span>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h3 className="font-medium text-lg">{stage.name}</h3>
                        <p className="text-sm text-muted-foreground">{stage.description}</p>
                      </div>
                      <Button variant="outline" size="sm">Editar</Button>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg mt-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Leads nesta etapa</div>
                          <div className="text-2xl font-bold flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            {stage.leadCount}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Taxa de conversão</div>
                          <div className="text-2xl font-bold flex items-center gap-2">
                            {stage.conversionRate}%
                            {index < funnelStages.length - 1 && (
                              <Badge className="bg-amber-100 text-amber-800">
                                {Math.round(stage.leadCount * (stage.conversionRate / 100))} leads
                              </Badge>
                            )}
                          </div>
                          <Progress 
                            value={stage.conversionRate} 
                            className="h-1.5 mt-1" 
                          />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Duração esperada</div>
                          <div className="text-2xl font-bold flex items-center gap-1">
                            {stage.expectedDuration}
                            <span className="text-base font-normal text-muted-foreground">dias</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Setas conectando as etapas */}
                {index < funnelStages.length - 1 && (
                  <div className="absolute left-6 top-full h-8 flex items-center justify-center">
                    <ArrowDown className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Análise de Conversão */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Análise de Conversão</CardTitle>
              <CardDescription>
                Dados de conversão entre etapas do funil
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              <span>Filtrar</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md divide-y">
            {funnelStages.slice(0, -1).map((stage, index) => {
              const nextStage = funnelStages[index + 1];
              const conversionCount = Math.round(stage.leadCount * (stage.conversionRate / 100));
              const conversionPercent = ((conversionCount / stage.leadCount) * 100).toFixed(1);
              
              return (
                <div key={`conversion-${stage.id}`} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="font-medium">{stage.name}</div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <div className="font-medium">{nextStage.name}</div>
                    </div>
                    <Badge className={
                      parseFloat(conversionPercent) > 70 ? "bg-green-100 text-green-800" :
                      parseFloat(conversionPercent) > 50 ? "bg-amber-100 text-amber-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {conversionPercent}%
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div>{stage.leadCount} leads</div>
                    <ArrowRight className="h-3 w-3" />
                    <div>{conversionCount} conversões</div>
                  </div>
                  
                  <div className="mt-2">
                    <Progress 
                      value={parseFloat(conversionPercent)} 
                      className={`h-1.5 ${
                        parseFloat(conversionPercent) > 70 ? "bg-green-500" :
                        parseFloat(conversionPercent) > 50 ? "bg-amber-500" :
                        "bg-red-500"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 p-4 border rounded-md bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Conversão global (Lead → Matrícula)</div>
              <Badge className="bg-blue-100 text-blue-800">
                {((funnelStages[funnelStages.length - 1].leadCount / funnelStages[0].leadCount) * 100).toFixed(1)}%
              </Badge>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {funnelStages[0].leadCount} leads iniciais → {funnelStages[funnelStages.length - 1].leadCount} matrículas
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FunnelManagement;
