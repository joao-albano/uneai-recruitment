
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MessageSquare, 
  Phone, 
  Database, 
  FileText, 
  Edit, 
  Infinity as InfinityIcon,
  Brain 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { PlanOption } from '@/utils/billing/planOptions';
import PlanLimitsDialog from './PlanLimitsDialog';

interface PlanLimitsManagerProps {
  planId: string;
  planName: string;
  limits?: PlanOption['limits'];
  onUpdateLimits: (planId: string, limits: PlanOption['limits']) => void;
}

const PlanLimitsManager: React.FC<PlanLimitsManagerProps> = ({
  planId,
  planName,
  limits,
  onUpdateLimits,
}) => {
  const { language } = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const isPtBR = language === 'pt-BR';

  const formatValue = (value: number | undefined) => {
    if (value === undefined) return '-';
    if (value < 0) return '∞'; // Infinity symbol for unlimited
    return value.toLocaleString();
  };

  const limitItems = [
    { 
      id: 'students',
      icon: <Users className="h-5 w-5 text-blue-500" />,
      name: isPtBR ? 'Alunos' : 'Students',
      value: limits?.students,
      description: isPtBR ? 'Número máximo de alunos' : 'Maximum number of students'
    },
    { 
      id: 'users',
      icon: <Users className="h-5 w-5 text-green-500" />,
      name: isPtBR ? 'Usuários' : 'Users',
      value: limits?.users,
      description: isPtBR ? 'Número máximo de usuários no sistema' : 'Maximum number of system users'
    },
    { 
      id: 'whatsappMessages',
      icon: <MessageSquare className="h-5 w-5 text-emerald-500" />,
      name: isPtBR ? 'Mensagens WhatsApp' : 'WhatsApp Messages',
      value: limits?.whatsappMessages,
      description: isPtBR ? 'Número mensal de mensagens' : 'Monthly number of messages'
    },
    { 
      id: 'callMinutes',
      icon: <Phone className="h-5 w-5 text-orange-500" />,
      name: isPtBR ? 'Minutos de Ligação' : 'Call Minutes',
      value: limits?.callMinutes,
      description: isPtBR ? 'Minutos mensais de ligação' : 'Monthly call minutes'
    },
    { 
      id: 'aiAnalyses',
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      name: isPtBR ? 'Análises de IA' : 'AI Analyses',
      value: limits?.aiAnalyses,
      description: isPtBR ? 'Quantidade mensal de análises' : 'Monthly number of analyses'
    },
    { 
      id: 'imports',
      icon: <Database className="h-5 w-5 text-red-500" />,
      name: isPtBR ? 'Importações' : 'Imports',
      value: limits?.imports,
      description: isPtBR ? 'Número mensal de importações' : 'Monthly number of imports'
    }
  ];

  const handleSaveLimits = (newLimits: PlanOption['limits']) => {
    onUpdateLimits(planId, newLimits);
    setDialogOpen(false);
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">
              {isPtBR ? 'Limites e Recursos' : 'Limits & Resources'}
            </CardTitle>
            <CardDescription>
              {isPtBR 
                ? `Gerencie os limites e recursos disponíveis no plano ${planName}`
                : `Manage limits and resources available in the ${planName} plan`}
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setDialogOpen(true)}
          >
            <Edit className="h-4 w-4" />
            {isPtBR ? 'Editar Limites' : 'Edit Limits'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {limitItems.map((item) => (
            <div 
              key={item.id} 
              className="flex items-start p-4 border rounded-lg gap-3"
            >
              <div className="mt-1">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground mb-2">{item.description}</div>
                <div className="flex items-center gap-2">
                  {item.value === -1 ? (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <InfinityIcon className="h-3 w-3" />
                      {isPtBR ? 'Ilimitado' : 'Unlimited'}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-base">
                      {formatValue(item.value)}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <PlanLimitsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveLimits}
        currentLimits={limits}
        planName={planName}
      />
    </Card>
  );
};

export default PlanLimitsManager;
