
import React from 'react';
import { Building } from 'lucide-react';

interface OrganizationsEmptyProps {
  message: string;
}

const OrganizationsEmpty: React.FC<OrganizationsEmptyProps> = ({ message }) => {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4 max-w-md text-center">
        <Building className="h-12 w-12 text-muted-foreground" />
        <p className="text-lg text-muted-foreground">
          {message}
        </p>
      </div>
    </div>
  );
};

export default OrganizationsEmpty;
