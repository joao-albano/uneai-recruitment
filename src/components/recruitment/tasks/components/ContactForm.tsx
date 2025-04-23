
import React from 'react';
import { TaskContact, ContactMethod, ContactAttemptResult } from '@/types/recruitment/tasks';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface ContactFormProps {
  formData: Partial<TaskContact>;
  onFormChange: (data: Partial<TaskContact>) => void;
  leadName?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  formData, 
  onFormChange,
  leadName
}) => {
  return (
    <div className="grid gap-4 py-4">
      {leadName && (
        <div className="bg-muted/30 p-3 rounded-md">
          <p className="text-sm text-center">
            Registrando contato com <span className="font-medium">{leadName}</span>
          </p>
        </div>
      )}
      
      <div className="grid gap-2">
        <Label htmlFor="method">Método de Contato</Label>
        <Select
          value={formData.method || 'telefone'}
          onValueChange={(value) => onFormChange({ ...formData, method: value as ContactMethod })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecionar método" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="telefone">Telefone</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="email">E-mail</SelectItem>
            <SelectItem value="presencial">Presencial</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="result">Resultado do Contato</Label>
        <Select
          value={formData.result || 'não_atendido'}
          onValueChange={(value) => onFormChange({ ...formData, result: value as ContactAttemptResult })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecionar resultado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="atendido">Atendido</SelectItem>
            <SelectItem value="não_atendido">Não Atendido</SelectItem>
            <SelectItem value="caixa_postal">Caixa Postal</SelectItem>
            <SelectItem value="número_inválido">Número Inválido</SelectItem>
            <SelectItem value="transferência">Transferência</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {formData.method === 'telefone' && (
        <div className="grid gap-2">
          <Label htmlFor="duration">Duração (segundos)</Label>
          <Input
            id="duration"
            type="number"
            min="0"
            value={formData.duration || "0"}
            onChange={(e) => onFormChange({ ...formData, duration: Number(e.target.value) })}
          />
        </div>
      )}
      
      <div className="grid gap-2">
        <Label htmlFor="notes">Observações</Label>
        <Textarea
          id="notes"
          placeholder="Adicionar observações sobre o contato..."
          rows={3}
          value={formData.notes || ''}
          onChange={(e) => onFormChange({ ...formData, notes: e.target.value })}
        />
      </div>
      
      {formData.result === 'atendido' && (
        <div className="bg-green-100 p-3 rounded-md">
          <p className="text-sm text-center text-green-800">
            Contato realizado com sucesso! A tarefa será marcada como concluída.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
