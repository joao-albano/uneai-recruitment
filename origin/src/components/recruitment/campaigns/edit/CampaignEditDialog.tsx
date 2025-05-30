
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Campaign } from '@/types/recruitment';
import CampaignEditForm from './CampaignEditForm';

interface CampaignEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign | null;
  onSave: (campaign: Campaign) => void;
}

const CampaignEditDialog: React.FC<CampaignEditDialogProps> = ({
  open,
  onOpenChange,
  campaign,
  onSave
}) => {
  // Add null check - if campaign is null, we shouldn't render the dialog
  if (!campaign) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Campanha</DialogTitle>
          <DialogDescription>
            Atualize as informações da campanha "{campaign.name}"
          </DialogDescription>
        </DialogHeader>
        
        <CampaignEditForm 
          campaign={campaign} 
          onSave={onSave} 
          onCancel={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default CampaignEditDialog;
