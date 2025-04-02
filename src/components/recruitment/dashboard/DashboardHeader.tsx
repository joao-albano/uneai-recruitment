
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">Captação de Alunos</h1>
        <p className="text-muted-foreground">
          Painel de controle e visualização operacional da captação
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="gap-2" onClick={() => navigate('/recruitment/leads')}>
          <UserPlus className="h-4 w-4" />
          <span>Gerenciar Leads</span>
        </Button>
        <Button className="gap-2" onClick={() => navigate('/recruitment/funnel')}>
          <Filter className="h-4 w-4" />
          <span>Funil de Captação</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
