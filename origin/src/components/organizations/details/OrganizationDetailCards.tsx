
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OrganizationProduct } from '../types';
import OrganizationProductsView from '../products/OrganizationProductsView';

interface OrganizationDetailCardsProps {
  organizationId: string;
  products: OrganizationProduct[];
}

const OrganizationDetailCards: React.FC<OrganizationDetailCardsProps> = ({ 
  organizationId, 
  products 
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <OrganizationProductsView 
            products={products || []} 
            showHeader={false}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Usuários</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/users?organization=${organizationId}`)}
            >
              <Users className="mr-2 h-4 w-4" />
              Ver todos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Gerencie os usuários associados a esta organização.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationDetailCards;
