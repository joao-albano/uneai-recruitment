
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/context/ThemeContext';
import { PlanOption } from '@/utils/billing/planOptions';
import { 
  Users, 
  MessageSquare, 
  Phone, 
  Database, 
  Brain, 
  Infinity as InfinityIcon 
} from 'lucide-react';

interface PlanLimitsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (limits: PlanOption['limits']) => void;
  currentLimits?: PlanOption['limits'];
  planName: string;
}

const PlanLimitsDialog: React.FC<PlanLimitsDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  currentLimits,
  planName,
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  const defaultLimits: PlanOption['limits'] = {
    students: currentLimits?.students || 0,
    users: currentLimits?.users || 0,
    whatsappMessages: currentLimits?.whatsappMessages || 0,
    callMinutes: currentLimits?.callMinutes || 0,
    aiAnalyses: currentLimits?.aiAnalyses || 0,
    imports: currentLimits?.imports || 0,
  };
  
  const [limits, setLimits] = useState<PlanOption['limits']>(defaultLimits);
  const [unlimitedStudents, setUnlimitedStudents] = useState<boolean>(
    currentLimits?.students === -1
  );

  const handleChange = (field: keyof PlanOption['limits'], value: string) => {
    const numValue = value === '' ? 0 : parseInt(value, 10);
    setLimits(prev => ({
      ...prev,
      [field]: isNaN(numValue) ? 0 : numValue
    }));
  };

  const handleUnlimitedStudentsChange = (checked: boolean) => {
    setUnlimitedStudents(checked);
    if (checked) {
      setLimits(prev => ({ ...prev, students: -1 }));
    } else {
      setLimits(prev => ({ ...prev, students: 0 }));
    }
  };

  const handleCancel = () => {
    setLimits(defaultLimits);
    setUnlimitedStudents(currentLimits?.students === -1);
    onOpenChange(false);
  };

  const handleSave = () => {
    onSave(limits);
  };

  const limitFields = [
    {
      id: 'students',
      name: isPtBR ? 'Alunos' : 'Students',
      icon: <Users className="h-4 w-4" />,
      hasUnlimited: true
    },
    {
      id: 'users',
      name: isPtBR ? 'Usuários' : 'Users',
      icon: <Users className="h-4 w-4" />
    },
    {
      id: 'whatsappMessages',
      name: isPtBR ? 'Mensagens WhatsApp' : 'WhatsApp Messages',
      icon: <MessageSquare className="h-4 w-4" />
    },
    {
      id: 'callMinutes',
      name: isPtBR ? 'Minutos de Ligação' : 'Call Minutes',
      icon: <Phone className="h-4 w-4" />
    },
    {
      id: 'aiAnalyses',
      name: isPtBR ? 'Análises de IA' : 'AI Analyses',
      icon: <Brain className="h-4 w-4" />
    },
    {
      id: 'imports',
      name: isPtBR ? 'Importações' : 'Imports',
      icon: <Database className="h-4 w-4" />
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {isPtBR ? `Editar limites do plano ${planName}` : `Edit limits for ${planName} plan`}
          </DialogTitle>
          <DialogDescription>
            {isPtBR 
              ? 'Defina os limites de recursos para este plano. Use -1 ou ative "Ilimitado" para recursos sem limite.' 
              : 'Set resource limits for this plan. Use -1 or enable "Unlimited" for unlimited resources.'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-5">
          {limitFields.map((field) => (
            <div key={field.id} className="flex items-center space-x-4">
              <div className="w-8 flex justify-center">{field.icon}</div>
              <div className="flex-1">
                <Label htmlFor={field.id} className="text-sm font-medium">
                  {field.name}
                </Label>
              </div>
              
              {field.hasUnlimited ? (
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${field.id}-unlimited`}
                    checked={unlimitedStudents}
                    onCheckedChange={handleUnlimitedStudentsChange}
                  />
                  <Label htmlFor={`${field.id}-unlimited`} className="flex items-center text-xs">
                    <InfinityIcon className="h-3 w-3 mr-1" />
                    {isPtBR ? 'Ilimitado' : 'Unlimited'}
                  </Label>
                </div>
              ) : null}
              
              <div className="w-24">
                <Input
                  id={field.id}
                  type="number"
                  min="0"
                  value={field.id === 'students' && unlimitedStudents ? "" : limits[field.id as keyof typeof limits]}
                  onChange={(e) => handleChange(field.id as keyof typeof limits, e.target.value)}
                  disabled={field.id === 'students' && unlimitedStudents}
                  placeholder="0"
                  className="text-right"
                />
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            {isPtBR ? 'Cancelar' : 'Cancel'}
          </Button>
          <Button onClick={handleSave}>
            {isPtBR ? 'Salvar alterações' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanLimitsDialog;
