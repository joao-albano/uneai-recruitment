
import React from 'react';
import { LeadData } from '@/types/recruitment/leads';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Phone, Mail, MessageSquare } from 'lucide-react';

interface LeadListProps {
  leads: LeadData[];
  compact?: boolean;
}

const LeadList: React.FC<LeadListProps> = ({ leads, compact = false }) => {
  if (!leads || leads.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Nenhum lead associado a esta tarefa.</p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="space-y-1">
        <p className="text-sm font-medium">Leads ({leads.length}):</p>
        <div className="flex flex-wrap gap-1">
          {leads.map(lead => (
            <Badge key={lead.id} variant="outline">
              {lead.name}
            </Badge>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[200px]">
      <div className="space-y-3">
        {leads.map(lead => (
          <div 
            key={lead.id} 
            className="p-3 border rounded-lg bg-background hover:bg-accent/5 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{lead.name}</p>
                <p className="text-sm text-muted-foreground">{lead.course || 'Curso não especificado'}</p>
              </div>
              <Badge variant="outline" className="capitalize">
                {lead.status}
              </Badge>
            </div>
            
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-3.5 w-3.5 mr-2" />
                {lead.phone}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5 mr-2" />
                {lead.email}
              </div>
              {lead.channel && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MessageSquare className="h-3.5 w-3.5 mr-2" />
                  <span className="capitalize">{lead.channel}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default LeadList;
