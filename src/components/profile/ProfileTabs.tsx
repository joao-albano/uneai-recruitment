
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { User, Lock } from 'lucide-react';
import AccountForm from './AccountForm';
import PasswordForm from './PasswordForm';

interface ProfileTabsProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ user, isAdmin, isSuperAdmin }) => {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-md">
        <TabsTrigger value="account" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Conta</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>Segurança</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Conta</CardTitle>
            <CardDescription>
              Atualize suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccountForm user={user} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Alterar Senha</CardTitle>
            <CardDescription>
              Atualize sua senha para manter sua conta segura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordForm isAdmin={isAdmin} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
