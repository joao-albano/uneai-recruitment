
import React from 'react';
import { TaskContact } from '@/types/recruitment/tasks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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
  const handleMethodChange = (value: string) => {
    onFormChange({ ...formData, method: value as any });
  };
  
  const handleResultChange = (value: string) => {
    onFormChange({ ...formData, result: value as any });
  };
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onFormChange({ ...formData, notes: e.target.value });
  };
  
  return (
    <div className="space-y-4 py-2">
      {leadName && (
        <div className="mb-4">
          <p className="text-sm font-medium">
            Registrar contato com <span className="font-bold">{leadName}</span>
          </p>
        </div>
      )}
      
      <div className="grid gap-2">
        <Label htmlFor="contact-method">Método de contato</Label>
        <Select 
          value={formData.method || 'telefone'} 
          onValueChange={handleMethodChange}
        >
          <SelectTrigger id="contact-method">
            <SelectValue placeholder="Selecione um método" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="telefone">Telefone</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="presencial">Presencial</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="contact-result">Resultado</Label>
        <Select 
          value={formData.result || 'não_atendido'} 
          onValueChange={handleResultChange}
        >
          <SelectTrigger id="contact-result">
            <SelectValue placeholder="Selecione um resultado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="atendido">Atendido</SelectItem>
            <SelectItem value="não_atendido">Não atendido</SelectItem>
            <SelectItem value="caixa_postal">Caixa postal</SelectItem>
            <SelectItem value="número_inválido">Número inválido</SelectItem>
            <SelectItem value="transferência">Transferência</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="contact-notes">Observações</Label>
        <Textarea 
          id="contact-notes"
          value={formData.notes || ''}
          onChange={handleNotesChange}
          placeholder="Digite suas observações..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default ContactForm;
