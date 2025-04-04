
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageSquare } from 'lucide-react';

// Lista de leads mockados para demonstração
// Em um ambiente real, esses leads viriam de uma API ou contexto
const mockLeads = [
  { id: '1', name: 'Maria Oliveira', email: 'maria@email.com', phone: '(11) 98765-4321', course: 'Psicologia' },
  { id: '2', name: 'João Silva', email: 'joao@email.com', phone: '(11) 91234-5678', course: 'Administração' },
  { id: '3', name: 'Pedro Souza', email: 'pedro@email.com', phone: '(11) 99876-5432', course: 'Direito' },
  { id: '4', name: 'Ana Santos', email: 'ana@email.com', phone: '(11) 98877-6655', course: 'Medicina' },
  { id: '5', name: 'Carla Lima', email: 'carla@email.com', phone: '(11) 97766-5544', course: 'Engenharia' },
];

interface NewConversationDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateConversation: (data: {
    name: string;
    email: string;
    phone: string;
    course: string;
  }) => void;
}

const formSchema = z.object({
  leadId: z.string().min(1, { message: 'Selecione um lead' }),
});

type FormValues = z.infer<typeof formSchema>;

const NewConversationDialog: React.FC<NewConversationDialogProps> = ({
  open,
  onClose,
  onCreateConversation,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leadId: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    // Localiza o lead selecionado na lista de leads
    const selectedLead = mockLeads.find(lead => lead.id === data.leadId);
    
    // Se encontrar o lead, inicia a conversa com ele
    if (selectedLead) {
      onCreateConversation({
        name: selectedLead.name,
        email: selectedLead.email,
        phone: selectedLead.phone,
        course: selectedLead.course
      });
    }
    
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Iniciar Nova Conversa</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="leadId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecione um Lead</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um lead" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockLeads.map((lead) => (
                          <SelectItem key={lead.id} value={lead.id}>
                            {lead.name} - {lead.course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
              <Button type="submit">
                <MessageSquare className="h-4 w-4 mr-2" />
                Iniciar Conversa
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewConversationDialog;
