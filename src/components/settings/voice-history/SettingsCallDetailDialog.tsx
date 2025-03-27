
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { VoiceCall } from '@/types/voicecall';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import SettingsCallStatusBadge from './SettingsCallStatusBadge';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

interface SettingsCallDetailDialogProps {
  call: VoiceCall | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsCallDetailDialog: React.FC<SettingsCallDetailDialogProps> = ({ 
  call, 
  open, 
  onOpenChange 
}) => {
  const { language } = useTheme();
  
  if (!call) return null;
  
  // Format date with time
  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return format(
      date, 
      'PPpp', 
      { locale: language === 'pt-BR' ? ptBR : enUS }
    );
  };
  
  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number | null) => {
    if (seconds === null) return '-';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'pt-BR' ? 'Detalhes da Ligação' : 'Call Details'}
          </DialogTitle>
          <DialogDescription>
            {language === 'pt-BR' 
              ? `Ligação para ${call.parentName} em ${formatDate(call.createdAt)}` 
              : `Call to ${call.parentName} on ${formatDate(call.createdAt)}`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-2">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">{language === 'pt-BR' ? 'Estudante' : 'Student'}</p>
              <p className="text-sm">{call.studentName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{language === 'pt-BR' ? 'Responsável' : 'Parent'}</p>
              <p className="text-sm">{call.parentName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{language === 'pt-BR' ? 'Telefone' : 'Phone'}</p>
              <p className="text-sm">{call.recipientNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{language === 'pt-BR' ? 'Status' : 'Status'}</p>
              <SettingsCallStatusBadge status={call.status} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{language === 'pt-BR' ? 'Início' : 'Started'}</p>
              <p className="text-sm">{formatDate(call.createdAt)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{language === 'pt-BR' ? 'Duração' : 'Duration'}</p>
              <p className="text-sm">{formatDuration(call.duration)}</p>
            </div>
          </div>
          
          {call.status === 'completed' && call.transcription && (
            <Tabs defaultValue="transcript" className="w-full mt-4">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="transcript">
                  {language === 'pt-BR' ? 'Transcrição' : 'Transcript'}
                </TabsTrigger>
                <TabsTrigger value="summary">
                  {language === 'pt-BR' ? 'Resumo' : 'Summary'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="transcript" className="mt-4">
                <ScrollArea className="h-48 w-full rounded-md border p-4">
                  <p className="text-sm whitespace-pre-wrap">{call.transcription}</p>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="summary" className="mt-4">
                <ScrollArea className="h-48 w-full rounded-md border p-4">
                  <p className="text-sm whitespace-pre-wrap">{call.summary || (language === 'pt-BR' ? 'Nenhum resumo disponível' : 'No summary available')}</p>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          )}
          
          {call.status !== 'completed' && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-center text-muted-foreground">
                {call.status === 'in-progress' 
                  ? (language === 'pt-BR' ? 'Ligação em andamento...' : 'Call in progress...')
                  : call.status === 'no-answer'
                  ? (language === 'pt-BR' ? 'Ligação não atendida pelo destinatário' : 'Call not answered by recipient')
                  : (language === 'pt-BR' ? 'Falha ao realizar ligação' : 'Failed to make call')}
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {language === 'pt-BR' ? 'Fechar' : 'Close'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsCallDetailDialog;
