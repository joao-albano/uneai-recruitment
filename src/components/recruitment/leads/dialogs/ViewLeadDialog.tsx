import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator';
import { User, Clock, Bookmark, Phone, Mail, MessageSquare, Users } from 'lucide-react';

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
    if (lead?.children) {
      if (Array.isArray(lead.children)) {
        setLeadChildren(lead.children);
      } 
      else if (typeof lead.children === 'number' && lead._childrenData && Array.isArray(lead._childrenData)) {
        setLeadChildren(lead._childrenData);
      }
      else {
        setLeadChildren([]);
      }
    } else {
      setLeadChildren([]);
    }
  }, [lead]);

  if (!lead) return null;

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

  const hasChildren = lead.children && 
    (typeof lead.children === 'number' && lead.children > 0) ||
    (Array.isArray(lead.children) && lead.children.length > 0);
  
  const childrenCount = typeof lead.children === 'number' 
    ? lead.children 
    : Array.isArray(lead.children) 
      ? lead.children.length 
      : 0;

  const hasChildrenData = leadChildren.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5" /> 
            Detalhes do Lead
            {hasChildren && (
              <Badge variant="outline" className="ml-2 flex items-center gap-1 bg-primary/10 text-primary">
                <Users className="h-3 w-3" />
                <span>{childrenCount} filho(s)</span>
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4">
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

          {hasChildren && (
            <div className="bg-muted/20 rounded-md p-4">
              <h3 className="font-semibold text-md mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" /> Informações dos Filhos ({childrenCount})
              </h3>
              {hasChildrenData ? (
                leadChildren.map((child, index) => (
                  <div key={index} className="mb-3 last:mb-0 p-3 border rounded-md">
                    <h4 className="font-medium">Filho {index + 1}</h4>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div>
                        <div className="text-sm text-muted-foreground">Nome</div>
                        <div>{child.name || "Não informado"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Idade</div>
                        <div>{child.age || "Não informado"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Série</div>
                        <div>{child.grade || "Não informado"}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-3 bg-muted/30 rounded-md">
                  <p className="text-sm">Nenhum detalhe disponível para os filhos deste lead.</p>
                </div>
              )}
            </div>
          )}

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
