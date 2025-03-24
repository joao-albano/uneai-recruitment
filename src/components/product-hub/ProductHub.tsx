
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useProduct, ProductType } from '@/context/ProductContext';

const ProductHub: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, isAdmin, isSuperAdmin } = useAuth();
  const { userSubscriptions, subscribeToProduct, availableProducts, hasAccessToProduct } = useProduct();
  
  const handleSubscribe = async (productType: ProductType) => {
    const success = await subscribeToProduct(productType);
    if (success) {
      // Redirecionar conforme o produto
      if (productType === 'retention') {
        navigate('/dashboard');
      } else if (productType === 'billing') {
        navigate('/billing');
      } else if (productType === 'recruitment') {
        navigate('/recruitment');
      }
    }
  };
  
  const navigateToProduct = (productType: ProductType) => {
    // Redirecionar conforme o produto
    if (productType === 'retention') {
      navigate('/dashboard');
    } else if (productType === 'billing') {
      navigate('/billing');
    } else if (productType === 'recruitment') {
      navigate('/recruitment');
    }
  };
  
  // Informações dos produtos
  const products = [
    {
      id: 'retention' as ProductType,
      title: 'Retenção de Alunos',
      description: 'Monitore o risco de evasão e realize intervenções preventivas para aumentar a retenção.',
      features: [
        'Análise preditiva de evasão',
        'Alertas automatizados',
        'Agendamento de intervenções',
        'Pesquisas com responsáveis'
      ]
    },
    {
      id: 'billing' as ProductType,
      title: 'Cobrança de Mensalidades',
      description: 'Gerencie mensalidades, despesas e fluxo de caixa com facilidade e eficiência.',
      features: [
        'Controle de mensalidades',
        'Gestão de inadimplência',
        'Relatórios financeiros',
        'Integração com bancos'
      ]
    },
    {
      id: 'recruitment' as ProductType,
      title: 'Captação de Alunos',
      description: 'Otimize seu processo de captação e matrícula de novos alunos.',
      features: [
        'Gestão de vagas',
        'Banco de candidatos',
        'Agendamento de entrevistas',
        'Avaliação de candidatos'
      ]
    }
  ];
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Plataforma Une.AI</h1>
        <p className="text-muted-foreground mt-2">
          Selecione o sistema que deseja acessar
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => {
          const isSubscribed = hasAccessToProduct(product.id);
          const isComingSoon = product.id !== 'retention';
          
          return (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center mb-2">
                  {product.id === 'retention' && (
                    <div className="w-8 h-8 mr-2 text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                        <circle cx="9" cy="9" r="5" />
                        <path d="M15 5.6l1-1" />
                        <path d="m21.5 12-1-1" />
                        <path d="M16 16.6l-1-1" />
                        <path d="m10.5 21-1-1" />
                        <path d="m3.5 12-1-1" />
                        <path d="M4 5.6l1-1" />
                      </svg>
                    </div>
                  )}
                  {product.id === 'billing' && (
                    <div className="w-8 h-8 mr-2 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M16 14v.01" />
                        <path d="M12 14v.01" />
                        <path d="M8 14v.01" />
                        <path d="M16 10v.01" />
                        <path d="M12 10v.01" />
                        <path d="M8 10v.01" />
                        <path d="M2 10h20" />
                      </svg>
                    </div>
                  )}
                  {product.id === 'recruitment' && (
                    <div className="w-8 h-8 mr-2 text-purple-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                        <path d="M4.9 19a2 2 0 0 1-1.8-1.1 7.2 7.2 0 0 1-.4-6.1 5.8 5.8 0 0 1 3.5-3.7A5.8 5.8 0 0 1 9.1 8h0a5.8 5.8 0 0 1 3 .1 5.8 5.8 0 0 1 3.5 3.8c.3.9.4 1.9.3 2.8a7.4 7.4 0 0 1-.7 3.2A2 2 0 0 1 13.1 19z" />
                        <path d="M9 12v-3" />
                        <path d="m13 9-4 3" />
                        <path d="M9 13v2" />
                      </svg>
                    </div>
                  )}
                  <CardTitle>{product.title}</CardTitle>
                </div>
                {isComingSoon ? (
                  <Badge variant="secondary" className="ml-auto">Em breve</Badge>
                ) : (
                  <Badge variant="default" className="ml-auto bg-blue-500 hover:bg-blue-600">Ativo</Badge>
                )}
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              
              <CardFooter className="mt-auto pt-4">
                {!isComingSoon ? (
                  <Button 
                    className="w-full" 
                    onClick={() => navigateToProduct(product.id)}
                  >
                    Acessar
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    disabled
                  >
                    Em breve
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {(isAdmin || isSuperAdmin) && (
        <div className="mt-8 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Área Administrativa</h2>
          <p className="text-muted-foreground mb-4">
            Como administrador, você tem acesso a configurações adicionais.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/dashboard')}
            >
              Dashboard Admin
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/users')}
            >
              Gerenciar Usuários
            </Button>
            {isSuperAdmin && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/admin/organizations')}
                >
                  Gerenciar Organizações
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/admin/settings')}
                >
                  Configurações do Sistema
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductHub;
