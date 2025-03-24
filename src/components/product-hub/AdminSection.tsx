
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AdminSectionProps {
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const AdminSection: React.FC<AdminSectionProps> = ({ isAdmin, isSuperAdmin }) => {
  const navigate = useNavigate();
  
  if (!isAdmin && !isSuperAdmin) {
    return null;
  }
  
  return (
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
  );
};

export default AdminSection;
