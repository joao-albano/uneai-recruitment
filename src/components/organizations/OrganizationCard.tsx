
import React from 'react';
import { OrganizationType } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MoreHorizontal, Building } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import OrganizationProductsView from './products/OrganizationProductsView';

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
  // Format date to Brazilian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "'Criada em' d 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Building className={organization.isMainOrg ? 'text-amber-500' : 'text-primary'} />
              <div>
                <h3 className="text-lg font-semibold">
                  {organization.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(organization.createdAt)}
                </p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(organization)}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onDelete(organization)}
                  disabled={organization.isMainOrg}
                >
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={organization.isActive ? "default" : "secondary"}
              className={organization.isActive 
                ? "bg-green-100 text-green-800 hover:bg-green-100" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
              }
            >
              {organization.isActive ? 'Ativa' : 'Inativa'}
            </Badge>

            {organization.isMainOrg && (
              <Badge className="bg-amber-50 text-amber-700 border-amber-200">
                Organização Principal
              </Badge>
            )}
          </div>

          {/* Products */}
          <div className="pt-2">
            <OrganizationProductsView 
              products={organization.products || []}
              showHeader={false}
              compact={true}
            />
          </div>

          {/* Users Link */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Usuários</span>
            </div>
            <a 
              href={`/users?organization=${organization.id}`}
              className="text-sm text-primary hover:underline"
            >
              Ver usuários
            </a>
          </div>

          {/* Admin Access Badge */}
          {organization.isMainOrg && (
            <div className="pt-2">
              <Badge variant="outline" className="w-full justify-center bg-amber-50 text-amber-700 border-amber-200">
                Acesso administrativo completo
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
