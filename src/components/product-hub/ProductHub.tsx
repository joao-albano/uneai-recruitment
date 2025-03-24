import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProduct } from '@/context/ProductContext';
import { useAuth } from '@/context/auth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Definição de um produto no ecossistema
interface Product {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  isActive: boolean;
  comingSoon?: boolean;
  badge?: string;
}

const ProductHub: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { setCurrentProduct } = useProduct();
  
  // Lista de produtos disponíveis no ecossistema
  const products: Product[] = [
    {
      id: 'retention',
      name: 'Retenção de Alunos',
      description: 'Sistema para monitoramento e prevenção de evasão escolar com inteligência artificial.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      route: '/dashboard',
      isActive: true,
      badge: 'Ativo'
    },
    {
      id: 'billing',
      name: 'Cobrança de Mensalidades',
      description: 'Gerenciamento de mensalidades, emissão de boletos e controle de inadimplência.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-green-500"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>,
      route: '/billing-system',
      isActive: false,
      comingSoon: true
    },
    {
      id: 'recruitment',
      name: 'Captação de Alunos',
      description: 'Processo de captação, funil de vendas e acompanhamento de matrículas.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-purple-500"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
      route: '/recruitment',
      isActive: false,
      comingSoon: true
    }
  ];
  
  // Função para navegar para o produto selecionado
  const handleProductSelect = (product: Product) => {
    if (product.isActive) {
      // Define o produto selecionado no contexto antes de navegar
      setCurrentProduct(product.id);
      navigate(product.route);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Plataforma Une.AI</h1>
        <p className="text-muted-foreground mt-1">
          Selecione o sistema que deseja acessar
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className={`hover:shadow-md transition-all ${product.isActive ? 'cursor-pointer' : 'opacity-80'}`}
            onClick={() => product.isActive && handleProductSelect(product)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="p-2 bg-slate-100 rounded-full">{product.icon}</div>
              <div>
                {product.badge && (
                  <Badge className="bg-blue-500">{product.badge}</Badge>
                )}
                {product.comingSoon && (
                  <Badge variant="outline">Em breve</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-xl">{product.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
            </CardContent>
            <CardFooter>
              {product.isActive ? (
                <Button 
                  className="w-full" 
                  onClick={() => handleProductSelect(product)}
                >
                  Acessar
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  variant="outline" 
                  disabled
                >
                  {product.comingSoon ? 'Em breve' : 'Indisponível'}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {isAdmin && (
        <div className="mt-10 p-4 border rounded-lg bg-slate-50">
          <h2 className="text-xl font-semibold mb-2">Área Administrativa</h2>
          <p className="text-sm text-muted-foreground mb-4">Como administrador, você tem acesso a configurações adicionais.</p>
          <div className="flex space-x-3">
            <Button onClick={() => navigate('/admin/dashboard')} variant="outline">
              Dashboard Admin
            </Button>
            <Button onClick={() => navigate('/users')} variant="outline">
              Gerenciar Usuários
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductHub;
