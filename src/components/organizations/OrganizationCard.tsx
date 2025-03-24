
import React from 'react';
import { OrganizationType } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, MoreHorizontal, Edit, Trash, Users, Clock, ShieldAlert } from 'lucide-react';

interface OrganizationCardProps {
  organization: OrganizationType;
  onEdit: (organization: OrganizationType) => void;
  onDelete: (organization: OrganizationType) => void;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization,
  onEdit,
  onDelete
}) => {
  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Building className={`h-8 w-8 ${organization.isMainOrg ? 'text-amber-500' : 'text-primary'}`} />
            <div>
              <CardTitle className="text-base font-semibold">{organization.name}</CardTitle>
              {organization.isMainOrg && (
                <Badge variant="outline" className="mt-1 bg-amber-50 text-amber-700 border-amber-200">
                  Organização Principal
                </Badge>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(organization)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive" 
                onClick={() => onDelete(organization)}
                disabled={organization.isMainOrg} // Não permitir excluir a org principal
              >
                <Trash className="mr-2 h-4 w-4" />
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Criada em {formatDate(organization.createdAt)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Badge 
              variant={organization.isActive ? "default" : "secondary"}
              className={organization.isActive 
                ? "bg-green-100 text-green-800 hover:bg-green-100" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
              }
            >
              {organization.isActive ? 'Ativa' : 'Inativa'}
            </Badge>
          </div>
          
          <div className="pt-2 border-t mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Usuários</span>
              </div>
              <a 
                href={`/users?organization=${organization.id}`} 
                className="text-xs text-primary hover:underline"
              >
                Ver usuários
              </a>
            </div>
          </div>

          {organization.isMainOrg && (
            <div className="pt-2 border-t mt-2">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-amber-500" />
                <span className="text-sm text-amber-700">Acesso administrativo completo</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
