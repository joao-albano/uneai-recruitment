
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useLeadForm } from './hooks/useLeadForm';
import LeadCreateDialogHeader from './components/LeadCreateDialogHeader';
import LeadFormTabs from './components/LeadFormTabs';
import LeadFormActions from './components/LeadFormActions';

interface LeadCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadCreateDialog: React.FC<LeadCreateDialogProps> = ({ open, onOpenChange }) => {
  const { form, onSubmit } = useLeadForm();
  
  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
    onOpenChange(false);
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
