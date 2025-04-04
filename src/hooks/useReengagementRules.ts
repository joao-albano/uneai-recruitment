
import { useState } from 'react';
import { ReengagementRule } from '@/types/recruitment';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

// Default rules for when no rules are stored
const DEFAULT_RULES: ReengagementRule[] = [
  {
    id: '1',
    name: 'Primeiro contato',
    days: 3,
    enabled: true,
    channels: ['mail', 'whatsapp'],
    message: 'Olá {{nome}}, notamos que você demonstrou interesse em {{curso}}. Podemos ajudar com alguma informação adicional?',
    emotionalTone: 'friendly',
    lastTriggered: new Date(Date.now() - 86400000), // ontem
    status: 'active'
  },
  {
    id: '2',
    name: 'Lembrete de prazo',
    days: 7,
    enabled: true,
    channels: ['whatsapp'],
    message: 'Olá {{nome}}! O prazo para inscrições no {{curso}} está se aproximando. Não perca essa oportunidade de transformar seu futuro!',
    emotionalTone: 'urgent',
    status: 'active'
  },
  {
    id: '3',
    name: 'Última tentativa',
    days: 15,
    enabled: true,
    channels: ['mail', 'whatsapp'],
    message: 'Prezado(a) {{nome}}, ainda estamos disponíveis para esclarecer suas dúvidas sobre o {{curso}}. Que tal marcarmos uma visita ao campus?',
    emotionalTone: 'formal',
    lastTriggered: new Date(Date.now() - 345600000), // 4 dias atrás
    status: 'active'
  }
];

export const useReengagementRules = () => {
  const [rules, setRules] = useState<ReengagementRule[]>(DEFAULT_RULES);
  const [editingRule, setEditingRule] = useState<ReengagementRule | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const handleToggleRule = (id: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
    
    const rule = rules.find(r => r.id === id);
    if (rule) {
      toast({
        title: rule.enabled ? 'Regra desativada' : 'Regra ativada',
        description: `Reengajamento automático de ${rule.days} dias foi ${rule.enabled ? 'desativado' : 'ativado'}.`,
      });
    }
  };
  
  const handleEditRule = (id: string) => {
    const rule = rules.find(r => r.id === id);
    if (rule) {
      setEditingRule({ ...rule });
      setIsCreating(false);
    }
  };
  
  const handleSaveRule = () => {
    if (editingRule) {
      if (isCreating) {
        // Add new rule
        setRules(prev => [...prev, editingRule]);
        toast({
          title: 'Regra criada',
          description: `Nova regra de reengajamento de ${editingRule.days} dias foi criada.`,
        });
      } else {
        // Update existing rule
        setRules(prev => prev.map(rule => 
          rule.id === editingRule.id ? editingRule : rule
        ));
        toast({
          title: 'Regra atualizada',
          description: `As alterações na regra de ${editingRule.days} dias foram salvas.`,
        });
      }
      setEditingRule(null);
      setIsCreating(false);
    }
  };
  
  const handleCreateNewRule = () => {
    // Initialize a new rule with default values
    setEditingRule({
      id: uuidv4(),
      name: `Regra ${rules.length + 1}`,
      days: 10,
      enabled: true,
      channels: ['mail'],
      message: 'Olá {{nome}}, gostaríamos de falar sobre sua inscrição para o curso de {{curso}}.',
      emotionalTone: 'friendly',
      status: 'active'
    });
    setIsCreating(true);
  };
  
  const handleCancelEdit = () => {
    setEditingRule(null);
    setIsCreating(false);
  };

  const handleUpdateRule = (updatedRule: ReengagementRule) => {
    setEditingRule(updatedRule);
  };
  
  const toggleAllRules = () => {
    const allEnabled = rules.every(r => r.enabled);
    setRules(prev => prev.map(rule => ({ ...rule, enabled: !allEnabled })));
    
    toast({
      title: allEnabled ? 'Sistema desativado' : 'Sistema ativado',
      description: `Todas as regras de reengajamento foram ${allEnabled ? 'desativadas' : 'ativadas'}.`,
    });
  };
  
  const areAnyRulesEnabled = rules.some(r => r.enabled);
  
  return {
    rules,
    editingRule,
    isCreating,
    areAnyRulesEnabled,
    handleToggleRule,
    handleEditRule,
    handleSaveRule,
    handleCreateNewRule,
    handleCancelEdit,
    handleUpdateRule,
    toggleAllRules,
  };
};
