
import React from 'react';
import { OrganizationType } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MoreHorizontal, Building } from 'lucide-react';

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
  // Format date to Brazilian format with safe fallback
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return '';
      }
      
      // Format as "Criada em DD de mês de YYYY"
      const day = date.getDate();
      const month = date.toLocaleDateString('pt-BR', { month: 'long' });
      const year = date.getFullYear();
      return `Criada em ${day} de ${month} de ${year}`;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return '';
    }
  };

  // Helper function to get product badge style
  const getProductBadgeStyle = (type: string) => {
    switch (type) {
      case 'retention':
        return 'bg-purple-600 text-white';
      case 'billing':
        return 'bg-green-600 text-white';
      case 'recruitment':
        return 'bg-blue-600 text-white';
      case 'secretary':
        return 'bg-amber-600 text-white';
      case 'pedagogical':
        return 'bg-indigo-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  // Helper function to get product display name
  const getProductDisplayName = (type: string) => {
    switch (type) {
      case 'retention':
        return 'Retenção de Alunos';
      case 'billing':
        return 'Cobrança';
      case 'recruitment':
        return 'Captação';
      case 'secretary':
        return 'Secretaria';
      case 'pedagogical':
        return 'Pedagógico';
      default:
        return type;
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header with title and menu */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Building className={organization.isMainOrg ? 'text-amber-500' : 'text-primary'} />
              <h3 className="text-lg font-semibold">{organization.name}</h3>
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

          {/* Main org badge */}
          {organization.isMainOrg && (
            <div className="py-1">
              <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-200">
                Organização Principal
              </Badge>
            </div>
          )}

          {/* Creation date */}
          <div className="text-sm text-muted-foreground">
            {formatDate(organization.createdAt)}
          </div>

          {/* Status badge */}
          <div className="py-1">
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

          {/* Product badges */}
          <div className="flex flex-wrap gap-2 pt-1 pb-2 border-b border-gray-100">
            {organization.products && organization.products
              .filter(product => product.active)
              .map(product => (
                <Badge 
                  key={product.type} 
                  className={getProductBadgeStyle(product.type)}
                >
                  {getProductDisplayName(product.type)}
                </Badge>
              ))}
          </div>

          {/* Users link */}
          <div className="flex items-center justify-between pt-1">
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
