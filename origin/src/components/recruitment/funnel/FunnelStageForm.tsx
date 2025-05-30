
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FunnelStage } from '@/types/recruitment';
import StageActionsList from './StageActionsList';

interface FunnelStageFormProps {
  formState: Partial<FunnelStage>;
  setFormState: React.Dispatch<React.SetStateAction<Partial<FunnelStage>>>;
}

const FunnelStageForm: React.FC<FunnelStageFormProps> = ({
  formState,
  setFormState
}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, name: e.target.value });
  };
  
  const handleColorChange = (value: string) => {
    setFormState({ ...formState, color: value });
  };

  return (
    <div className="py-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome da Etapa</Label>
        <Input 
          id="name" 
          placeholder="Ex: Contato Inicial, Agendamento, etc."
          value={formState.name || ''}
          onChange={handleNameChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="color">Cor da Etapa</Label>
        <Select 
          value={formState.color || 'bg-blue-500'} 
          onValueChange={handleColorChange}
        >
          <SelectTrigger id="color">
            <SelectValue placeholder="Selecione uma cor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bg-blue-500">Azul</SelectItem>
            <SelectItem value="bg-green-500">Verde</SelectItem>
            <SelectItem value="bg-red-500">Vermelho</SelectItem>
            <SelectItem value="bg-yellow-500">Amarelo</SelectItem>
            <SelectItem value="bg-purple-500">Roxo</SelectItem>
            <SelectItem value="bg-amber-500">Âmbar</SelectItem>
            <SelectItem value="bg-pink-500">Rosa</SelectItem>
            <SelectItem value="bg-indigo-500">Índigo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <StageActionsList 
        actions={formState.actions || ['']}
        onChange={(actions) => setFormState({ ...formState, actions })}
      />
    </div>
  );
};

export default FunnelStageForm;
