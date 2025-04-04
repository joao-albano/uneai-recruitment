
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Campaign } from '@/types/recruitment';

interface CampaignDetailsHeaderProps {
  campaign: Campaign;
}

const CampaignDetailsHeader: React.FC<CampaignDetailsHeaderProps> = ({ campaign }) => {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        {campaign.name}
        <Badge variant={campaign.status === 'active' ? 'default' : 'outline'}>
          {campaign.status === 'active' ? 'Ativa' : 
          campaign.status === 'paused' ? 'Pausada' : 
          campaign.status === 'completed' ? 'Arquivada' : 'Rascunho'}
        </Badge>
      </DialogTitle>
      <DialogDescription>
        {campaign.description || 'Detalhes da campanha de captação'}
      </DialogDescription>
    </DialogHeader>
  );
};

export default CampaignDetailsHeader;
