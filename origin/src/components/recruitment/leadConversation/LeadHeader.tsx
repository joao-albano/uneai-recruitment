
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { getStatusBadge } from './utils/leadUtils';

interface LeadHeaderProps {
  leadData: {
    id: string;
    name: string;
    status: string;
    funnelStage: string;
  };
}

const LeadHeader: React.FC<LeadHeaderProps> = ({ leadData }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{leadData.name}</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>ID: {leadData.id}</span>
          <span>•</span>
          <span>
            {getStatusBadge(leadData.status)}
          </span>
          <span>•</span>
          <span>Etapa: {leadData.funnelStage}</span>
        </div>
      </div>
      <Button variant="outline" className="gap-2">
        <Edit className="h-4 w-4" />
        Editar Lead
      </Button>
    </div>
  );
};

export default LeadHeader;
