
import React from 'react';
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ProductSubscription } from '@/context/ProductContext';
import { UserType } from '../types';

interface UserSubscriptionsProps {
  selectedUser: UserType;
  subscriptions: ProductSubscription[];
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const UserSubscriptions: React.FC<UserSubscriptionsProps> = ({
  selectedUser,
  subscriptions,
  isAdmin,
  isSuperAdmin
}) => {
  // Só mostrar assinaturas para admins ou superadmins
  if (!isAdmin && !isSuperAdmin) return null;
  
  // Filtrar assinaturas do usuário
  const userSubscriptions = subscriptions.filter(
    sub => sub.id.includes(selectedUser.id.toString())
  );
  
  return (
    <div className="space-y-2">
      <Label>Assinaturas de Produtos</Label>
      
      <div className="border rounded-md p-3">
        {userSubscriptions.length > 0 ? (
          <ul className="space-y-2">
            {userSubscriptions.map((sub) => (
              <li key={sub.id} className="flex justify-between items-center">
                <div>
                  <span className="capitalize">
                    {sub.productType === 'retention' ? 'Retenção' : 
                     sub.productType === 'billing' ? 'Financeiro' : 
                     sub.productType === 'recruitment' ? 'Recrutamento' : 
                     sub.productType}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    desde {new Date(sub.startDate).toLocaleDateString()}
                  </span>
                </div>
                
                <Badge variant={sub.status === 'active' ? 'default' : 'outline'}>
                  {sub.status === 'active' ? 'Ativo' : 
                   sub.status === 'pending' ? 'Pendente' : 'Inativo'}
                </Badge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground py-1">
            Este usuário não possui assinaturas de produtos.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserSubscriptions;
