import React from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, Mail, Phone, MessageSquare, FileText, 
  Clock, BarChart2
} from 'lucide-react';
import { getEmotionBadge, getLeadScore } from './utils/leadUtils.tsx';

interface LeadInfoProps {
  leadData: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    funnelStage: string;
    course: string;
    lastContactDate: Date;
    enrollmentScore: number;
    createdAt: Date;
    lastEmotion?: string;
    lastIntent?: string;
    lastObjection?: string;
    channel: string;
    responsiblePerson: string;
    notes?: string;
  };
}

const LeadInfo: React.FC<LeadInfoProps> = ({ leadData }) => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'novo': return <Badge className="bg-blue-500">Novo</Badge>;
      case 'contatado': return <Badge className="bg-purple-500">Contatado</Badge>;
      case 'interessado': return <Badge className="bg-green-500">Interessado</Badge>;
      case 'agendado': return <Badge className="bg-amber-500">Agendado</Badge>;
      case 'matriculado': return <Badge className="bg-emerald-500">Matriculado</Badge>;
      case 'desistente': return <Badge className="bg-red-500">Desistente</Badge>;
      default: return <Badge className="bg-gray-500">Indefinido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Informações do Lead</CardTitle>
          <CardDescription>Dados de contato e status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center">
            <div className="w-10 text-muted-foreground">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Nome</div>
              <div>{leadData.name}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 text-muted-foreground">
              <Mail className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Email</div>
              <div>{leadData.email}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 text-muted-foreground">
              <Phone className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Telefone</div>
              <div>{leadData.phone}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 text-muted-foreground">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Canal</div>
              <div className="capitalize">{leadData.channel}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 text-muted-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Curso de Interesse</div>
              <div>{leadData.course}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 text-muted-foreground">
              <Clock className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Último contato</div>
              <div>{leadData.lastContactDate.toLocaleDateString()}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 text-muted-foreground">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Responsável</div>
              <div>{leadData.responsiblePerson}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Análise Preditiva</CardTitle>
          <CardDescription>Insights gerados por IA</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-1">Chance de Matrícula</div>
            <div className="flex items-center">
              <div className="flex-1">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${leadData.enrollmentScore}%` }}
                  ></div>
                </div>
              </div>
              <div className="ml-3">
                {getLeadScore(leadData.enrollmentScore)}
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Estado Emocional</div>
            <div>{getEmotionBadge(leadData.lastEmotion)}</div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Última Intenção</div>
            <div>
              <Badge variant="outline">{leadData.lastIntent?.replace('_', ' ')}</Badge>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Objeção Detectada</div>
            <div>
              <Badge variant="destructive">{leadData.lastObjection?.replace('_', ' ')}</Badge>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium">Sugestões Personalizadas</div>
            <div className="mt-2 space-y-2">
              <Badge className="block w-full p-2 justify-start font-normal bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20" variant="outline">
                Oferecer desconto de 15% para turno noturno
              </Badge>
              <Badge className="block w-full p-2 justify-start font-normal bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20" variant="outline">
                Destacar programa de financiamento estudantil
              </Badge>
              <Badge className="block w-full p-2 justify-start font-normal bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20" variant="outline">
                Agendar visita ao campus em horário comercial
              </Badge>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="text-sm font-medium mb-1">Observações</div>
            <div className="text-sm p-3 bg-muted rounded-md">
              {leadData.notes}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadInfo;
