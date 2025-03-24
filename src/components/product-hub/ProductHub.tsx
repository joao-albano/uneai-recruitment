
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronsRight } from "lucide-react";
import { useProduct, ProductType } from '@/context/ProductContext';
import { useAuth } from '@/context/auth';
import { useToast } from '@/hooks/use-toast';

const ProductHub: React.FC = () => {
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const { userSubscriptions, subscribeToProduct } = useProduct();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  
  const handleSubscribe = async (productId: ProductType) => {
    try {
      setSubscribing(productId);
      const success = await subscribeToProduct(productId);
      
      if (success) {
        toast({
          title: "Produto assinado com sucesso",
          description: "Você agora pode acessar todas as funcionalidades."
        });
      }
    } catch (error) {
      console.error('Erro ao assinar produto:', error);
      toast({
        title: "Erro ao assinar produto",
        description: "Ocorreu um erro ao processar sua assinatura. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setSubscribing(null);
    }
  };
  
  const isSubscribed = (productId: string): boolean => {
    return userSubscriptions.some(sub => 
      sub.productType === productId && sub.status === 'active'
    );
  };
  
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Hub de Produtos UNE CX</h1>
        <p className="text-muted-foreground mt-2">
          Descubra e acesse todas as soluções disponíveis para sua instituição
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Produto 1: Retenção de Alunos */}
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="bg-primary/5">
            <CardTitle>Retenção de Alunos</CardTitle>
            <CardDescription>
              Reduza a evasão escolar com inteligência artificial
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Identificação de alunos em risco</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Questionários e formulários</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Agendamento de intervenções</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {isSubscribed('retention') ? (
              <Button className="w-full" variant="outline" asChild>
                <a href="/dashboard">
                  Acessar
                  <ChevronsRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ) : (
              <Button 
                className="w-full" 
                onClick={() => handleSubscribe('retention')}
                disabled={subscribing === 'retention'}
              >
                {subscribing === 'retention' ? 'Assinando...' : 'Assinar'}
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Produto 2: Cobrança */}
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="bg-primary/5">
            <CardTitle>Gestão de Cobrança</CardTitle>
            <CardDescription>
              Otimize seu processo de cobrança e reduza a inadimplência
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Automação de cobranças</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Conciliação financeira</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Relatórios financeiros</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {isSubscribed('billing') ? (
              <Button className="w-full" variant="outline" asChild>
                <a href="/billing/dashboard">
                  Acessar
                  <ChevronsRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ) : (
              <Button 
                className="w-full" 
                onClick={() => handleSubscribe('billing')}
                disabled={subscribing === 'billing'}
              >
                {subscribing === 'billing' ? 'Assinando...' : 'Assinar'}
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Produto 3: Recrutamento */}
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="bg-primary/5">
            <CardTitle>Recrutamento</CardTitle>
            <CardDescription>
              Otimize o processo de captação de alunos
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Gestão de leads</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Automação de comunicação</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Relatórios de conversão</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {isSubscribed('recruitment') ? (
              <Button className="w-full" variant="outline" asChild>
                <a href="/recruitment/dashboard">
                  Acessar
                  <ChevronsRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ) : (
              <Button 
                className="w-full" 
                onClick={() => handleSubscribe('recruitment')}
                disabled={subscribing === 'recruitment'}
              >
                {subscribing === 'recruitment' ? 'Assinando...' : 'Assinar'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProductHub;
