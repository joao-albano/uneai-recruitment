
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrganizationType } from './types';
import { format, isValid, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from "@/components/ui/badge";
import { getProductDisplayName } from '@/components/users/utils/userUtils';

interface OrganizationCardProps {
  organization: OrganizationType;
  onEdit: (org: OrganizationType) => void;
  onDelete: (org: OrganizationType) => void;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Data não disponível';
  
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return 'Data inválida';
    
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
};

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization,
  onEdit,
  onDelete
}) => {
  // Extract active products
  const activeProducts = organization.products
    ? organization.products.filter(p => p.active)
    : [];
    
  const isMainOrg = organization.isMainOrg || false;
  
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">
            {organization.name}
          </CardTitle>
          {isMainOrg && (
            <Badge className="bg-yellow-500 hover:bg-yellow-600">Principal</Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {/* Products */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Produtos Ativos:</h3>
          <div className="flex flex-wrap gap-2">
            {activeProducts.length > 0 ? (
              activeProducts.map((product, index) => (
                <Badge key={index} variant="secondary">
                  {getProductDisplayName(product.type)}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">Nenhum produto ativo</span>
            )}
          </div>
        </div>
        
        {/* Creation Date */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Criada em:</h3>
          <p className="text-sm">{formatDate(organization.createdAt)}</p>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-3 flex justify-between">
        <Button variant="outline" onClick={() => onEdit(organization)}>
          Editar
        </Button>
        <Button variant="destructive" onClick={() => onDelete(organization)}>
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrganizationCard;
