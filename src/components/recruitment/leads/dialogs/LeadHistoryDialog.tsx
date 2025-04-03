
import React, { useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getLeadHistory } from '../data/mockLeadsData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Clock, User, Clipboard, Calendar, AlertCircle, CheckCircle, BookOpen } from 'lucide-react';

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
  // Fetch history safely
  const history = lead ? getLeadHistory(lead.id) : [];

  // Improved close handler with proper event prevention
  const handleClose = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenChange(false);
  }, [onOpenChange]);

  // Handle dialog click to prevent propagation
  const handleDialogClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Get appropriate icon for action type
  const getActionIcon = (action: string) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes('criação')) return <AlertCircle className="h-4 w-4 text-blue-500" />;
    if (actionLower.includes('contato')) return <MessageSquare className="h-4 w-4 text-indigo-500" />;
    if (actionLower.includes('interação')) return <User className="h-4 w-4 text-violet-500" />;
    if (actionLower.includes('agendamento')) return <Calendar className="h-4 w-4 text-amber-500" />;
    if (actionLower.includes('visita')) return <BookOpen className="h-4 w-4 text-cyan-500" />;
    if (actionLower.includes('matrícula')) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (actionLower.includes('negociação')) return <Clipboard className="h-4 w-4 text-orange-500" />;
    if (actionLower.includes('pagamento')) return <Clipboard className="h-4 w-4 text-emerald-500" />;
    if (actionLower.includes('reunião')) return <User className="h-4 w-4 text-purple-500" />;
    if (actionLower.includes('envio')) return <MessageSquare className="h-4 w-4 text-sky-500" />;
    return <Clock className="h-4 w-4 text-gray-500" />;
  };

  // Get color for action badge
  const getActionBadgeClass = (action: string) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes('criação')) return "bg-blue-100 text-blue-800";
    if (actionLower.includes('contato')) return "bg-indigo-100 text-indigo-800";
    if (actionLower.includes('interação')) return "bg-violet-100 text-violet-800";
    if (actionLower.includes('agendamento')) return "bg-amber-100 text-amber-800";
    if (actionLower.includes('visita')) return "bg-cyan-100 text-cyan-800";
    if (actionLower.includes('matrícula')) return "bg-green-100 text-green-800";
    if (actionLower.includes('negociação')) return "bg-orange-100 text-orange-800";
    if (actionLower.includes('pagamento')) return "bg-emerald-100 text-emerald-800";
    if (actionLower.includes('reunião')) return "bg-purple-100 text-purple-800";
    if (actionLower.includes('envio')) return "bg-sky-100 text-sky-800";
    return "bg-gray-100 text-gray-800";
  };

  if (!lead) return null;

  return (
    <Dialog 
      open={open} 
      onOpenChange={onOpenChange}
    >
      <DialogContent 
        className="sm:max-w-[600px] max-h-[80vh] z-50" 
        onClick={handleDialogClick}
      >
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Clock className="h-5 w-5" /> Histórico do Lead
          </DialogTitle>
          <DialogDescription>Visualize o histórico completo deste lead.</DialogDescription>
          
          {lead && (
            <div className="mt-2 text-sm">
              <div className="font-medium text-foreground">{lead.name}</div>
              <div className="text-muted-foreground flex items-center gap-1">
                <MessageSquare className="h-3 w-3" /> {lead.email} • {lead.phone}
              </div>
            </div>
          )}
        </DialogHeader>

        {history.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            Nenhum histórico encontrado para este lead.
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-6 relative pl-8">
              {/* Linha vertical do timeline */}
              <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-border"></div>

              {history.map((item: any) => (
                <div key={item.id} className="relative">
                  {/* Círculo do timeline */}
                  <div className="absolute -left-5 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center mt-1">
                    {getActionIcon(item.action)}
                  </div>

                  <div className="bg-muted/20 p-3 rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={`${getActionBadgeClass(item.action)}`}>
                        {item.action}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{item.date}</span>
                    </div>
                    
                    <p className="text-sm mb-2">{item.notes}</p>
                    
                    <div className="text-xs flex items-center text-muted-foreground">
                      <User className="h-3 w-3 mr-1" />
                      <span>Realizado por: {item.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <div className="flex justify-end mt-4">
          <Button 
            variant="outline" 
            onClick={handleClose}
            type="button"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadHistoryDialog;
