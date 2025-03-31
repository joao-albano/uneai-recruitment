
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useLeadForm } from './hooks/useLeadForm';
import LeadCreateDialogHeader from './components/LeadCreateDialogHeader';
import LeadFormTabs from './components/LeadFormTabs';
import LeadFormActions from './components/LeadFormActions';
import { useToast } from '@/hooks/use-toast';

interface LeadCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadCreateDialog: React.FC<LeadCreateDialogProps> = ({ open, onOpenChange }) => {
  const { form, onSubmit } = useLeadForm();
  const { toast } = useToast();
  
  const handleSubmit = form.handleSubmit((data) => {
    try {
      const result = onSubmit(data);
      console.log('Lead salvo com sucesso:', result);
      toast({
        title: "Lead criado com sucesso",
        description: "As informações do lead foram salvas"
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao salvar lead:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o lead. Tente novamente.",
        variant: "destructive"
      });
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <LeadCreateDialogHeader />
        
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <LeadFormTabs form={form} />
            <LeadFormActions onCancel={() => onOpenChange(false)} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCreateDialog;
