
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator';
import { User, Clock, Bookmark, Phone, Mail, MessageSquare } from 'lucide-react';

interface Child {
  name: string;
  age: string;
  grade: string;
}

interface ViewLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: any | null;
}

const ViewLeadDialog: React.FC<ViewLeadDialogProps> = ({ open, onOpenChange, lead }) => {
  const [leadChildren, setLeadChildren] = useState<Child[]>([]);

  useEffect(() => {
    // Try to parse children data if it exists
    if (lead?.children && typeof lead.children === 'object') {
      setLeadChildren(Array.isArray(lead.children) ? lead.children : []);
    } else {
      setLeadChildren([]);
    }
  }, [lead]);

  if (!lead) return null;

  // Format date
  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return "Data inválida";
      const date = typeof dateString === 'string' 
        ? dateString.includes('T') 
          ? parseISO(dateString) 
          : new Date(dateString)
        : new Date(dateString);
      
      return format(date, 'dd/MM/yyyy', { locale: ptBR });
    } catch (e) {
      return "Data inválida";
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'novo':
        return 'bg-blue-100 text-blue-800';
      case 'em andamento':
        return 'bg-amber-100 text-amber-800';
      case 'aguardando':
        return 'bg-purple-100 text-purple-800';
      case 'finalizado':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5" /> 
            Detalhes do Lead
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4">
          {/* Basic Info */}
          <div className="bg-muted/20 rounded-md p-4">
            <h3 className="font-semibold text-md mb-3 flex items-center gap-2">
              <User className="h-4 w-4" /> Informações Básicas
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-sm text-muted-foreground">Nome</div>
                <div className="font-medium">{lead.name}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Curso de Interesse</div>
                <div className="font-medium">{lead.course}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="font-medium flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {lead.email || "Não informado"}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Telefone</div>
                <div className="font-medium flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {lead.phone || "Não informado"}
                </div>
              </div>
            </div>
          </div>

          {/* Channel & Status */}
          <div className="bg-muted/20 rounded-md p-4">
            <h3 className="font-semibold text-md mb-3 flex items-center gap-2">
              <Bookmark className="h-4 w-4" /> Situação e Canal
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-sm text-muted-foreground">Canal</div>
                <Badge variant="outline" className="mt-1">
                  {lead.channel}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <Badge className={`mt-1 ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Etapa</div>
                <div className="font-medium">{lead.stage}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Data de Cadastro</div>
                <div className="font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(lead.createdAt)}
                </div>
              </div>
            </div>
          </div>

          {/* Children */}
          {Array.isArray(leadChildren) && leadChildren.length > 0 ? (
            <div className="bg-muted/20 rounded-md p-4">
              <h3 className="font-semibold text-md mb-3 flex items-center gap-2">
                <User className="h-4 w-4" /> Informações dos Filhos ({leadChildren.length})
              </h3>
              {leadChildren.map((child, index) => (
                <div key={index} className="mb-3 last:mb-0 p-3 border rounded-md">
                  <h4 className="font-medium">Filho {index + 1}</h4>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div>
                      <div className="text-sm text-muted-foreground">Nome</div>
                      <div>{child.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Idade</div>
                      <div>{child.age}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Série</div>
                      <div>{child.grade}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            lead.children && typeof lead.children === 'number' && lead.children > 0 ? (
              <div className="bg-muted/20 rounded-md p-4">
                <h3 className="font-semibold text-md mb-1 flex items-center gap-2">
                  <User className="h-4 w-4" /> Filhos
                </h3>
                <p className="text-sm">Este lead possui {lead.children} filho(s) registrado(s), mas os detalhes não estão disponíveis.</p>
              </div>
            ) : null
          )}

          {/* Observations/Notes */}
          {lead.notes && (
            <div className="bg-muted/20 rounded-md p-4">
              <h3 className="font-semibold text-md mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Observações
              </h3>
              <p className="text-sm whitespace-pre-line">{lead.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewLeadDialog;
