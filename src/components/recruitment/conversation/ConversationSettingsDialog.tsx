
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ConversationSettingsDialogProps {
  open: boolean;
  onClose: () => void;
  showAnalytics: boolean;
  onToggleAnalytics: (show: boolean) => void;
  isAiMode: boolean;
  onToggleAiMode: (useAi: boolean) => void;
}

const ConversationSettingsDialog: React.FC<ConversationSettingsDialogProps> = ({
  open,
  onClose,
  showAnalytics,
  onToggleAnalytics,
  isAiMode,
  onToggleAiMode
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configurações da Conversa</DialogTitle>
          <DialogDescription>
            Personalize as opções de atendimento e visualização
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="display">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="display">Visualização</TabsTrigger>
            <TabsTrigger value="attendance">Atendimento</TabsTrigger>
            <TabsTrigger value="automation">Automação</TabsTrigger>
          </TabsList>

          <TabsContent value="display" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-analytics">Mostrar análise de sentimentos</Label>
              <Switch 
                id="show-analytics" 
                checked={showAnalytics}
                onCheckedChange={onToggleAnalytics}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-timestamps">Mostrar horários das mensagens</Label>
              <Switch id="show-timestamps" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="compact-view">Modo compacto</Label>
              <Switch id="compact-view" />
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="ai-mode">Modo de atendimento IA</Label>
              <Switch 
                id="ai-mode" 
                checked={isAiMode}
                onCheckedChange={onToggleAiMode}
              />
            </div>
            
            <div>
              <Label htmlFor="auto-assignment">Atribuição automática</Label>
              <Select defaultValue="round-robin">
                <SelectTrigger id="auto-assignment" className="mt-1">
                  <SelectValue placeholder="Selecione um método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="round-robin">Alternado (Round-Robin)</SelectItem>
                  <SelectItem value="load-balancing">Balanceamento de carga</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Define como os atendimentos serão atribuídos aos atendentes disponíveis
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-offline">Modo offline automático</Label>
              <Switch id="auto-offline" defaultChecked />
            </div>
          </TabsContent>

          <TabsContent value="automation" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-greeting">Saudação automática</Label>
              <Switch id="auto-greeting" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="ai-suggestions">Sugestões da IA</Label>
              <Switch id="ai-suggestions" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-follow-up">Follow-up automático</Label>
              <Switch id="auto-follow-up" />
            </div>
            
            <div>
              <Label htmlFor="inactivity-timeout">Tempo de inatividade (minutos)</Label>
              <Select defaultValue="30">
                <SelectTrigger id="inactivity-timeout" className="mt-1">
                  <SelectValue placeholder="Selecione um tempo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutos</SelectItem>
                  <SelectItem value="15">15 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                  <SelectItem value="120">2 horas</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Tempo após o qual uma conversa será marcada como inativa
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={onClose}>Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConversationSettingsDialog;
