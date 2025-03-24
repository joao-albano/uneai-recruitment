
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
  const { currentUser } = useAuth();
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
      title: 'Gestão Financeira',
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
      title: 'Recrutamento',
      description: 'Otimize seu processo de contratação de professores e colaboradores.',
      features: [
        'Gestão de vagas',
        'Banco de currículos',
        'Agendamento de entrevistas',
        'Avaliação de candidatos'
      ]
    }
  ];
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Central de Produtos</h1>
        <p className="text-muted-foreground mt-2">
          Conheça todas as soluções que temos para sua instituição de ensino.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const isSubscribed = hasAccessToProduct(product.id);
          
          return (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{product.title}</CardTitle>
                  {isSubscribed && (
                    <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                      <Check className="h-3 w-3 mr-1" />
                      Ativo
                    </Badge>
                  )}
                </div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isSubscribed ? (
                  <Button 
                    className="w-full" 
                    onClick={() => navigateToProduct(product.id)}
                  >
                    Acessar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleSubscribe(product.id)}
                  >
                    Assinar Agora
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProductHub;
