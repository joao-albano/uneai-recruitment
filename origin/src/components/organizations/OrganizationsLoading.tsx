
import React from 'react';

const OrganizationsLoading: React.FC = () => {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        <p className="text-sm text-muted-foreground">
          Carregando organizações...
        </p>
      </div>
    </div>
  );
};

export default OrganizationsLoading;
