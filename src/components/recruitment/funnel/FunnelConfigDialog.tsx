
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Funnel } from '@/types/recruitment';

interface FunnelConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  funnel: Funnel | null;
  onSave?: (config: {
    autoMoveLeads: boolean;
    notifyStaleLeads: boolean;
    staleDays: number;
  }) => void;
}

const FunnelConfigDialog: React.FC<FunnelConfigDialogProps> = ({
  open,
  onOpenChange,
  funnel,
  onSave = () => {}
}) => {
  const { toast } = useToast();
  const [autoMoveLeads, setAutoMoveLeads] = React.useState(false);
  const [notifyStaleLeads, setNotifyStaleLeads] = React.useState(true);
  const [staleDays, setStaleDays] = React.useState(7);

  const handleSave = () => {
    onSave({
      autoMoveLeads,
      notifyStaleLeads,
      staleDays
    });
    
    toast({
      title: "Configuração salva",
      description: "As configurações do funil foram atualizadas com sucesso",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Configurações do Funil</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-move">Movimentação automática</Label>
              <p className="text-sm text-muted-foreground">
                Mover leads automaticamente entre etapas com base em ações
              </p>
            </div>
            <Switch
              id="auto-move"
              checked={autoMoveLeads}
              onCheckedChange={setAutoMoveLeads}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify-stale">Notificar leads estagnados</Label>
              <p className="text-sm text-muted-foreground">
                Alertar sobre leads que não avançaram no funil
              </p>
            </div>
            <Switch
              id="notify-stale"
              checked={notifyStaleLeads}
              onCheckedChange={setNotifyStaleLeads}
            />
          </div>
          
          {notifyStaleLeads && (
            <div className="pl-6 border-l-2 border-muted">
              <div className="space-y-2">
                <Label htmlFor="stale-days">Dias para alerta</Label>
                <Input
                  id="stale-days"
                  type="number"
                  min={1}
                  max={30}
                  value={staleDays}
                  onChange={(e) => setStaleDays(parseInt(e.target.value) || 7)}
                  className="w-24"
                />
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar Configurações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FunnelConfigDialog;
