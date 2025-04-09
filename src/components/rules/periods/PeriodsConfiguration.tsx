
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import PeriodsHeader from './PeriodsHeader';
import PeriodsInfo from './PeriodsInfo';

const PeriodsConfiguration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('academic');

  return (
    <div className="space-y-6">
      <PeriodsHeader />
      
      <Alert variant="default" className="bg-primary/5 border-primary/20">
        <InfoIcon className="h-4 w-4 text-primary" />
        <AlertTitle>Este recurso está em fase de implementação</AlertTitle>
        <AlertDescription>
          A configuração de períodos permitirá definir o calendário acadêmico, marcos importantes
          para captação e períodos de análise para o sistema de previsão.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="academic" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="academic">Períodos Acadêmicos</TabsTrigger>
          <TabsTrigger value="milestones">Marcos Importantes</TabsTrigger>
          <TabsTrigger value="analysis">Períodos de Análise</TabsTrigger>
        </TabsList>
        
        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Períodos Acadêmicos</CardTitle>
              <CardDescription>
                Configure os períodos letivos para planejamento de captação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-6 text-center text-muted-foreground">
                <p>Esta funcionalidade estará disponível em breve.</p>
                <p className="mt-2">Aqui você poderá definir os períodos acadêmicos (semestres/anos) para captação.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="milestones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marcos Importantes</CardTitle>
              <CardDescription>
                Defina datas críticas para o processo de captação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-6 text-center text-muted-foreground">
                <p>Esta funcionalidade estará disponível em breve.</p>
                <p className="mt-2">Aqui você poderá configurar datas importantes como início e fim de inscrições, matrículas, etc.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Períodos de Análise</CardTitle>
              <CardDescription>
                Configure os intervalos para análise de previsões
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-6 text-center text-muted-foreground">
                <p>Esta funcionalidade estará disponível em breve.</p>
                <p className="mt-2">Aqui você poderá definir os períodos para análise de dados e previsões.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <PeriodsInfo />
    </div>
  );
};

export default PeriodsConfiguration;
