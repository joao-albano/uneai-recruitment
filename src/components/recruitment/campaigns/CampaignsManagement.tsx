
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const CampaignsManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campanhas</h1>
          <p className="text-muted-foreground">
            Gerencie suas campanhas de captação de alunos
          </p>
        </div>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Nova Campanha
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Campanhas Ativas</CardTitle>
          <CardDescription>
            Visualize e gerencie suas campanhas de captação em andamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border p-4 text-center">
            <p className="text-muted-foreground">
              Você ainda não tem campanhas ativas. Crie uma nova campanha para começar.
            </p>
            <Button variant="outline" className="mt-4">
              Criar Campanha
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignsManagement;
