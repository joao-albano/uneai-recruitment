
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthLogo from '@/components/auth/AuthLogo';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to product hub if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/hub');
    }
  }, [isAuthenticated, navigate]);

  const handleSwitchToSignup = () => {
    setActiveTab('signup');
  };

  const handleSwitchToLogin = () => {
    setActiveTab('login');
  };

  const handleSignupSuccess = (email: string) => {
    setActiveTab('login');
    toast.success(`Conta criada! Por favor, faça login com ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-3xl">
        <AuthLogo />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Cadastro</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Entrar</CardTitle>
                <CardDescription>
                  Entre com seu email e senha para acessar o sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm onSwitchTab={handleSwitchToSignup} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Criar Conta</CardTitle>
                <CardDescription>
                  Preencha os dados para criar uma nova conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SignupForm 
                  onSwitchTab={handleSwitchToLogin} 
                  onSuccess={handleSignupSuccess} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
