
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const AdditionalInfoForm: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Observações</Label>
        <Textarea 
          className="w-full border rounded-md p-2 mt-1 h-24 resize-y"
          placeholder="Informações adicionais sobre o lead..."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Intenção de Matrícula</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a intenção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="baixa">Baixa</SelectItem>
              <SelectItem value="indefinida">Indefinida</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Melhor Horário para Contato</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o horário" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manha">Manhã</SelectItem>
              <SelectItem value="tarde">Tarde</SelectItem>
              <SelectItem value="noite">Noite</SelectItem>
              <SelectItem value="qualquer">Qualquer horário</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
