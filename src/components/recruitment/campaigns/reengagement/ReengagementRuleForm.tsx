
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Phone, AlertCircle } from 'lucide-react';
import { ReengagementRule, ChannelType } from '@/types/recruitment';
import { useVoiceCallConfig } from '@/hooks/useVoiceCallConfig';

interface ReengagementRuleFormProps {
  rule: ReengagementRule;
  isCreating: boolean;
  onSave: () => void;
  onCancel: () => void;
  onRuleChange: (updatedRule: ReengagementRule) => void;
}

const ReengagementRuleForm: React.FC<ReengagementRuleFormProps> = ({
  rule,
  isCreating,
  onSave,
  onCancel,
  onRuleChange,
}) => {
  const { config: voiceCallConfig } = useVoiceCallConfig();

  const getToneColor = (tone: string): string => {
    switch (tone) {
      case 'urgent': return 'text-red-500';
      case 'friendly': return 'text-green-500';
      case 'formal': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="days">Dias de inatividade</Label>
          <Input 
            id="days" 
            type="number" 
            min="1" 
            value={rule.days} 
            onChange={(e) => onRuleChange({...rule, days: parseInt(e.target.value)})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tone">Tom emocional</Label>
          <select 
            id="tone"
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
            value={rule.emotionalTone}
            onChange={(e) => onRuleChange({
              ...rule, 
              emotionalTone: e.target.value as 'neutral' | 'urgent' | 'friendly' | 'formal'
            })}
          >
            <option value="neutral">Neutro</option>
            <option value="urgent">Urgente</option>
            <option value="friendly">Amigável</option>
            <option value="formal">Formal</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Canais</Label>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Switch 
              checked={rule.channels.includes('mail')} 
              onCheckedChange={() => {
                const newChannels = rule.channels.includes('mail')
                  ? rule.channels.filter(c => c !== 'mail')
                  : [...rule.channels, 'mail' as ChannelType];
                onRuleChange({...rule, channels: newChannels});
              }}
              id="channel-email"
            />
            <Label htmlFor="channel-email" className="cursor-pointer flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              checked={rule.channels.includes('whatsapp')} 
              onCheckedChange={() => {
                const newChannels = rule.channels.includes('whatsapp')
                  ? rule.channels.filter(c => c !== 'whatsapp')
                  : [...rule.channels, 'whatsapp' as ChannelType];
                onRuleChange({...rule, channels: newChannels});
              }}
              id="channel-whatsapp"
            />
            <Label htmlFor="channel-whatsapp" className="cursor-pointer flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              WhatsApp
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              checked={rule.channels.includes('sms')} 
              onCheckedChange={() => {
                const newChannels = rule.channels.includes('sms')
                  ? rule.channels.filter(c => c !== 'sms')
                  : [...rule.channels, 'sms' as ChannelType];
                onRuleChange({...rule, channels: newChannels});
              }}
              id="channel-sms"
            />
            <Label htmlFor="channel-sms" className="cursor-pointer">
              SMS
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              checked={rule.channels.includes('voice')} 
              onCheckedChange={() => {
                const newChannels = rule.channels.includes('voice')
                  ? rule.channels.filter(c => c !== 'voice')
                  : [...rule.channels, 'voice' as ChannelType];
                onRuleChange({...rule, channels: newChannels});
              }}
              id="channel-voice"
              disabled={voiceCallConfig.provider === 'disabled'}
            />
            <Label 
              htmlFor="channel-voice" 
              className={`cursor-pointer flex items-center gap-2 ${voiceCallConfig.provider === 'disabled' ? 'text-muted-foreground' : ''}`}
            >
              <Phone className="h-4 w-4" />
              Ligação de Voz
            </Label>
          </div>
        </div>
        
        {voiceCallConfig.provider === 'disabled' && rule.channels.includes('voice') && (
          <div className="mt-2 text-xs text-amber-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            A integração de chamadas de voz não está configurada. Configure nas configurações do sistema.
          </div>
        )}
      </div>
    
      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea 
          id="message" 
          rows={5}
          value={rule.message}
          onChange={(e) => onRuleChange({...rule, message: e.target.value})}
          placeholder="Digite a mensagem de reengajamento. Use {{nome}} e {{curso}} como variáveis."
          className={getToneColor(rule.emotionalTone)}
        />
        <p className="text-xs text-muted-foreground">
          Variáveis disponíveis: {"{{nome}}"}, {"{{curso}}"}, {"{{instituicao}}"}, {"{{data_limite}}"}
        </p>
      </div>
      
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={onSave}>
          {isCreating ? 'Criar Regra' : 'Salvar Alterações'}
        </Button>
      </div>
    </div>
  );
};

export default ReengagementRuleForm;
