import React, { useState, useEffect } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Phone, PhoneOff, Volume2, Volume1, VolumeX, Hash } from 'lucide-react';
import { toast } from "sonner";
import { useRegistryRules } from '@/components/rules/registry/hooks/useRegistryRules';
import RegistrySelectionDialog from '../RegistrySelectionDialog';
import { analyzeConversationForRegistry } from '@/utils/messageAnalysis';

const VoiceTab: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState<'off' | 'low' | 'normal'>('normal');
  const [callDuration, setCallDuration] = useState(0);
  const [showRegistryDialog, setShowRegistryDialog] = useState(false);
  const { rules } = useRegistryRules();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const handleStartCall = () => {
    setIsCallActive(true);
    toast.success("Iniciando chamada com o lead");
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    handleAutoRegistry();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? "Microfone ativado" : "Microfone desativado");
  };

  const cycleVolume = () => {
    const volumes: Array<'off' | 'low' | 'normal'> = ['off', 'low', 'normal'];
    const currentIndex = volumes.indexOf(volume);
    const nextVolume = volumes[(currentIndex + 1) % volumes.length];
    setVolume(nextVolume);
  };

  const handleAutoRegistry = async () => {
    const mockMessages = [{
      content: `Chamada de voz - Duração: ${Math.floor(callDuration / 60)}:${(callDuration % 60).toString().padStart(2, '0')}`,
      type: 'voice',
      timestamp: new Date()
    }];
    
    const result = await analyzeConversationForRegistry(mockMessages, rules);
    
    if (result) {
      handleEndWithRegistry(result.code, result.description);
    } else {
      setShowRegistryDialog(true);
    }
  };

  const handleEndWithRegistry = (code: string, description: string) => {
    toast.info(`Chamada tabulada como: ${code} - ${description}`);
  };

  const VolumeIcon = {
    off: VolumeX,
    low: Volume1,
    normal: Volume2
  }[volume];

  return (
    <TabsContent value="voz" className="flex-1 p-4">
      <div className="flex flex-col h-full space-y-6">
        <div className="flex items-center justify-center p-6 bg-muted/20 rounded-lg">
          {isCallActive ? (
            <div className="text-center">
              <div className="text-xl font-semibold text-primary mb-2">
                Chamada em andamento
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.floor(callDuration / 60)}:{(callDuration % 60).toString().padStart(2, '0')}
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              Pronto para iniciar uma chamada
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="lg"
            className="h-16 w-16 rounded-full"
            onClick={toggleMute}
          >
            {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </Button>

          <Button
            variant={isCallActive ? "destructive" : "default"}
            size="lg"
            className="h-16 w-16 rounded-full"
            onClick={isCallActive ? handleEndCall : handleStartCall}
          >
            {isCallActive ? (
              <PhoneOff className="h-6 w-6" />
            ) : (
              <Phone className="h-6 w-6" />
            )}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-16 w-16 rounded-full"
            onClick={cycleVolume}
          >
            <VolumeIcon className="h-6 w-6" />
          </Button>

          {isCallActive && (
            <Button
              variant="outline"
              size="lg"
              className="h-16 w-16 rounded-full"
              onClick={() => setShowRegistryDialog(true)}
            >
              <Hash className="h-6 w-6" />
            </Button>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-medium mb-4">Histórico Recente</h3>
          <div className="space-y-2">
            {[
              { date: "Hoje, 14:30", duration: "5:23", status: "Concluída" },
              { date: "Hoje, 11:15", duration: "3:45", status: "Não atendida" },
              { date: "Ontem, 16:20", duration: "8:12", status: "Concluída" }
            ].map((call, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/10 rounded-lg"
              >
                <div>
                  <div className="font-medium">{call.date}</div>
                  <div className="text-sm text-muted-foreground">
                    Duração: {call.duration}
                  </div>
                </div>
                <span className={`text-sm ${
                  call.status === "Concluída" ? "text-green-500" : "text-yellow-500"
                }`}>
                  {call.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <RegistrySelectionDialog
          open={showRegistryDialog}
          onClose={() => setShowRegistryDialog(false)}
          onSelect={handleEndWithRegistry}
          rules={rules.filter(r => r.type === 'human')}
          type="human"
        />
      </div>
    </TabsContent>
  );
};

export default VoiceTab;
