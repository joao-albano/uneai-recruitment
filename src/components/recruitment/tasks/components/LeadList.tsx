
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Phone, Calendar } from 'lucide-react';
import { LeadData } from '@/types/recruitment/leads';

interface LeadListProps {
  leads: LeadData[];
  onContactLead: (lead: LeadData) => void;
  onScheduleLead: (lead: LeadData) => void;
}

const LeadList: React.FC<LeadListProps> = ({ leads, onContactLead, onScheduleLead }) => {
  if (!leads?.length) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        Nenhum lead associado a esta tarefa.
      </div>
    );
  }

  const handleContactClick = (lead: LeadData, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onContactLead) {
      onContactLead(lead);
    }
  };

  const handleScheduleClick = (lead: LeadData, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onScheduleLead) {
      onScheduleLead(lead);
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>{lead.course}</TableCell>
              <TableCell>
                {lead.phone}<br />
                <span className="text-sm text-muted-foreground">{lead.email}</span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleContactClick(lead, e)}
                    title="Contatar lead"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleScheduleClick(lead, e)}
                    title="Agendar contato"
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadList;
