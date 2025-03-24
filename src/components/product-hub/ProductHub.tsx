
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      description: 'Sistema para monitoramento e prevenção de evasão escolar com inteligência artificial.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <circle cx="9" cy="9" r="5" />
          <path d="M15 5.6l1-1" />
          <path d="m21.5 12-1-1" />
          <path d="M16 16.6l-1-1" />
          <path d="m10.5 21-1-1" />
          <path d="m3.5 12-1-1" />
          <path d="M4 5.6l1-1" />
        </svg>
      ),
      iconColor: 'text-blue-500',
      isActive: true
    },
    {
      id: 'billing' as ProductType,
      title: 'Cobrança de Mensalidades',
      description: 'Gerenciamento de mensalidades, emissão de boletos e controle de inadimplência.',
      icon: (
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
      ),
      iconColor: 'text-green-500',
      isActive: false
    },
    {
      id: 'recruitment' as ProductType,
      title: 'Captação de Alunos',
      description: 'Processo de captação, funil de vendas e acompanhamento de matrículas.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M4.9 19a2 2 0 0 1-1.8-1.1 7.2 7.2 0 0 1-.4-6.1 5.8 5.8 0 0 1 3.5-3.7A5.8 5.8 0 0 1 9.1 8h0a5.8 5.8 0 0 1 3 .1 5.8 5.8 0 0 1 3.5 3.8c.3.9.4 1.9.3 2.8a7.4 7.4 0 0 1-.7 3.2A2 2 0 0 1 13.1 19z" />
          <path d="M9 12v-3" />
          <path d="m13 9-4 3" />
          <path d="M9 13v2" />
        </svg>
      ),
      iconColor: 'text-purple-500',
      isActive: false
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
          const isActive = product.id === 'retention';
          const isComingSoon = !isActive;
          
          return (
            <div 
              key={product.id} 
              className="bg-white rounded-lg border p-6 flex flex-col h-full"
            >
              <div className="flex mb-2">
                <div className={`w-10 h-10 ${product.iconColor}`}>
                  {product.icon}
                </div>
                <div className="ml-auto">
                  {isActive ? (
                    <Badge className="bg-blue-500 hover:bg-blue-600">Ativo</Badge>
                  ) : (
                    <Badge variant="secondary">Em breve</Badge>
                  )}
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                {product.description}
              </p>
              
              {isActive ? (
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
            </div>
          );
        })}
      </div>
      
      {(isAdmin || isSuperAdmin) && (
        <div className="mt-8 p-6 border rounded-lg bg-white">
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
