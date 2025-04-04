
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Clock, MessageSquare, Mail, Edit2, Phone } from 'lucide-react';
import { ReengagementRule } from '@/types/recruitment';

interface ReengagementRuleCardProps {
  rule: ReengagementRule;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
}

const ReengagementRuleCard: React.FC<ReengagementRuleCardProps> = ({
  rule,
  onToggle,
  onEdit,
}) => {
  const getToneColor = (tone: string): string => {
    switch (tone) {
      case 'urgent': return 'text-red-500';
      case 'friendly': return 'text-green-500';
      case 'formal': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };
  
  const getToneBadge = (tone: string) => {
    switch (tone) {
      case 'urgent':
        return <Badge variant="destructive">Urgente</Badge>;
      case 'friendly':
        return <Badge variant="secondary" className="bg-green-500 text-white">Amigável</Badge>;
      case 'formal':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Formal</Badge>;
      default:
        return <Badge variant="secondary">Neutro</Badge>;
    }
  };

  return (
    <Card className={`border ${!rule.enabled ? 'bg-muted/50' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-base font-semibold">
              {rule.days} {rule.days === 1 ? 'dia' : 'dias'} de inatividade
            </h3>
            {getToneBadge(rule.emotionalTone)}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Switch 
                checked={rule.enabled}
                onCheckedChange={() => onToggle(rule.id)}
                aria-label={`Ativar regra de ${rule.days} dias`}
              />
              <span className="text-sm text-muted-foreground">
                {rule.enabled ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onEdit(rule.id)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <div className="flex items-center">
              {rule.channels.includes('whatsapp') && <MessageSquare className="h-3.5 w-3.5 mr-1" />}
              {rule.channels.includes('mail') && <Mail className="h-3.5 w-3.5 mr-1" />}
              {rule.channels.includes('voice') && <Phone className="h-3.5 w-3.5 mr-1" />}
              <span>{rule.channels.map(c => {
                if (c === 'voice') return 'Ligação de Voz';
                if (c === 'mail') return 'Email';
                return c.charAt(0).toUpperCase() + c.slice(1);
              }).join(', ')}</span>
            </div>
            {rule.lastTriggered && (
              <div className="flex items-center gap-1">
                <span>•</span>
                <span>Última execução: {new Date(rule.lastTriggered).toLocaleDateString('pt-BR')}</span>
              </div>
            )}
          </div>
          <p className={`p-3 bg-muted rounded-md ${getToneColor(rule.emotionalTone)}`}>
            {rule.message}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReengagementRuleCard;
