
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductSubscription } from '@/context/ProductContext';
import { UserType } from '../types';
import { Check, X } from 'lucide-react';

interface UserSubscriptionsProps {
  selectedUser: UserType;
  subscriptions?: ProductSubscription[];
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}

const UserSubscriptions: React.FC<UserSubscriptionsProps> = ({
  selectedUser,
  subscriptions = [],
  isAdmin = false,
  isSuperAdmin = false
}) => {
  // Mostrar detalhes de assinatura apenas para admins e super admins
  if (!isAdmin && !isSuperAdmin || subscriptions.length === 0) {
    return null;
  }
  
  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Assinaturas do Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {subscriptions.map((subscription, index) => (
            <div key={index} className="flex justify-between items-center py-1 border-b last:border-0">
              <div className="flex items-center">
                <span className="font-medium text-sm">{subscription.productType}</span>
              </div>
              <Badge 
                variant={subscription.status === 'active' ? "default" : "outline"} 
                className={subscription.status === 'active' ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
              >
                {subscription.status === 'active' ? (
                  <Check className="mr-1 h-3 w-3" />
                ) : (
                  <X className="mr-1 h-3 w-3" />
                )}
                {subscription.status === 'active' ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSubscriptions;
