
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Lead {
  id: number;
  name: string;
  course: string;
  channel: string;
  time: string;
}

const RecentLeadsCard: React.FC = () => {
  const navigate = useNavigate();

  // Dados de leads recentes
  const recentLeads: Lead[] = [{
    id: 1,
    name: 'Maria Oliveira',
    course: 'Ensino Fundamental I',
    channel: 'Site',
    time: '2h'
  }, {
    id: 2,
    name: 'Carlos Santos',
    course: 'Ensino Médio',
    channel: 'WhatsApp',
    time: '3h'
  }, {
    id: 3,
    name: 'Ana Paula Silva',
    course: 'Educação Infantil',
    channel: 'Facebook',
    time: '5h'
  }, {
    id: 4,
    name: 'Roberto Almeida',
    course: 'Ensino Fundamental II',
    channel: 'Instagram',
    time: '8h'
  }, {
    id: 5,
    name: 'Juliana Costa',
    course: 'Período Integral',
    channel: 'Indicação',
    time: '12h'
  }];

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium">Leads Recentes</CardTitle>
          <CardDescription>
            Últimos contatos cadastrados
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/recruitment/leads')}>
          <span>Ver Todos</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentLeads.map(lead => (
            <div key={lead.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{lead.name}</p>
                <p className="text-sm text-muted-foreground">
                  {lead.course} • Canal: {lead.channel}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">Há {lead.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentLeadsCard;
