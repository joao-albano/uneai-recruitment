
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building, Calendar, Users, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";
import { OrganizationType } from '../types';
import OrganizationProductsView from '../products/OrganizationProductsView';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

const OrganizationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin, isSuperAdmin } = useAuth();
  const [organization, setOrganization] = useState<OrganizationType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrganization = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('organizations')
          .select(`
            id, 
            name, 
            is_main_org,
            created_at, 
            updated_at,
            products:organization_products(
              id,
              type,
              active,
              organization_id,
              created_at,
              updated_at
            )
          `)
          .eq('id', id)
          .single();
          
        if (error) {
          console.error('Erro ao carregar organização:', error);
          toast.error('Erro ao carregar os dados da organização');
          navigate('/organizations');
          return;
        }
        
        if (data) {
          setOrganization({
            id: data.id,
            name: data.name,
            isActive: true, // Default to true since is_active doesn't exist in DB
            isMainOrg: data.is_main_org || false,
            createdAt: data.created_at,
            products: data.products?.map(p => ({
              type: p.type,
              active: p.active || false
            })) || []
          });
        }
      } catch (error) {
        console.error('Erro ao carregar organização:', error);
        toast.error('Erro ao carregar os dados da organização');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Check permissions
    if (!isAdmin && !isSuperAdmin) {
      toast.error("Você não tem permissão para acessar esta página");
      navigate('/');
      return;
    }
    
    loadOrganization();
  }, [id, navigate, isAdmin, isSuperAdmin]);
  
  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">
            Carregando informações da organização...
          </p>
        </div>
      </div>
    );
  }
  
  if (!organization) {
    return (
      <div className="p-8">
        <Button 
          variant="ghost" 
          className="mb-8" 
          onClick={() => navigate('/organizations')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        <div className="flex h-full items-center justify-center p-8">
          <div className="flex flex-col items-center space-y-4 max-w-md text-center">
            <Building className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              Organização não encontrada ou você não tem permissão para visualizá-la.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/organizations')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        
        <Button 
          onClick={() => navigate(`/organizations/${id}/edit`)}
        >
          <Edit className="mr-2 h-4 w-4" /> Editar
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <Building className={`h-12 w-12 ${organization.isMainOrg ? 'text-amber-500' : 'text-primary'}`} />
        <div>
          <h1 className="text-2xl font-bold">{organization.name}</h1>
          <div className="flex items-center gap-2 mt-1">
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
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                Organização Principal
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>Criada em {formatDate(organization.createdAt)}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <OrganizationProductsView 
              products={organization.products || []} 
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
                onClick={() => navigate(`/users?organization=${organization.id}`)}
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
    </div>
  );
};

export default OrganizationDetailsPage;
