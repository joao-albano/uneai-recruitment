
import React from 'react';

interface UsersHeaderProps {
  userCount: number;
}

const UsersHeader: React.FC<UsersHeaderProps> = ({ userCount }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Usuários</h1>
      <p className="text-muted-foreground mt-1">
        Gerencie usuários e suas permissões no sistema
      </p>
    </div>
  );
};

export default UsersHeader;
