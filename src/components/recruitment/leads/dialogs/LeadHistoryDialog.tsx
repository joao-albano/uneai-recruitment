
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getLeadHistory } from '../data/mockLeadsData';

interface LeadHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: any;
}

const LeadHistoryDialog: React.FC<LeadHistoryDialogProps> = ({
  open,
  onOpenChange,
  lead,
}) => {
  // Buscar histórico do lead
  const history = lead ? getLeadHistory(lead.id) : [];

  return (
    <Dialog 
      open={open} 
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">Histórico do Lead</DialogTitle>
          <DialogDescription>Visualize o histórico completo deste lead.</DialogDescription>
          
          {lead && (
            <div className="mt-2 text-sm text-muted-foreground">
              <div className="font-medium text-foreground">{lead.name}</div>
              <div>{lead.email} • {lead.phone}</div>
            </div>
          )}
        </DialogHeader>

        {history.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            Nenhum histórico encontrado para este lead.
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-6 relative pl-6">
              {/* Linha vertical do timeline */}
              <div className="absolute left-2 top-2 bottom-0 w-0.5 bg-border"></div>

              {history.map((item: any) => (
                <div key={item.id} className="relative">
                  {/* Círculo do timeline */}
                  <div className="absolute -left-6 w-4 h-4 rounded-full bg-primary mt-1.5"></div>

                  <div className="pb-2 mb-2">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <span className="font-medium">{item.action}</span>
                        <span className="text-sm text-muted-foreground ml-2">por {item.user}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.date}</span>
                    </div>

                    <p className="text-sm">{item.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadHistoryDialog;
