
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { VoiceCall } from '@/types/voicecall';
import { format } from 'date-fns';
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

interface CallDetailDialogProps {
  call: VoiceCall | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CallDetailDialog: React.FC<CallDetailDialogProps> = ({ call, open, onOpenChange }) => {
  const { language } = useTheme();
  
  if (!call) return null;
  
  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number | null) => {
    if (seconds === null) return '-';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Get status badge classes
  const getStatusClasses = (status: VoiceCall['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'no-answer':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get status label
  const getStatusLabel = (status: VoiceCall['status']) => {
    if (language === 'pt-BR') {
      switch (status) {
        case 'completed':
          return 'Completada';
        case 'in-progress':
          return 'Em Andamento';
        case 'no-answer':
          return 'Sem Resposta';
        case 'failed':
          return 'Falha';
        default:
          return status;
      }
    } else {
      switch (status) {
        case 'completed':
          return 'Completed';
        case 'in-progress':
          return 'In Progress';
        case 'no-answer':
          return 'No Answer';
        case 'failed':
          return 'Failed';
        default:
          return status;
      }
    }
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
              ? `Ligação para ${call.parentName} em ${format(call.createdAt, 'dd/MM/yyyy HH:mm')}` 
              : `Call to ${call.parentName} on ${format(call.createdAt, 'MM/dd/yyyy HH:mm')}`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <p className="text-sm font-medium mb-1">{language === 'pt-BR' ? 'Estudante' : 'Student'}</p>
            <p>{call.studentName}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">{language === 'pt-BR' ? 'Responsável' : 'Parent'}</p>
            <p>{call.parentName}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">{language === 'pt-BR' ? 'Telefone' : 'Phone'}</p>
            <p>{call.recipientNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">{language === 'pt-BR' ? 'Data/Hora' : 'Date/Time'}</p>
            <p>{format(call.createdAt, 'dd/MM/yyyy HH:mm:ss')}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">{language === 'pt-BR' ? 'Duração' : 'Duration'}</p>
            <p>{formatDuration(call.duration)}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">{language === 'pt-BR' ? 'Status' : 'Status'}</p>
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusClasses(call.status)}`}>
              {getStatusLabel(call.status)}
            </span>
          </div>
        </div>
        
        {call.status === 'completed' && call.transcription && (
          <Tabs defaultValue="transcript" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="transcript">
                {language === 'pt-BR' ? 'Transcrição' : 'Transcript'}
              </TabsTrigger>
              <TabsTrigger value="summary">
                {language === 'pt-BR' ? 'Resumo' : 'Summary'}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="transcript">
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <p className="whitespace-pre-line">{call.transcription}</p>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="summary">
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <p className="whitespace-pre-line">{call.summary || (language === 'pt-BR' ? 'Nenhum resumo disponível.' : 'No summary available.')}</p>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            {language === 'pt-BR' ? 'Fechar' : 'Close'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallDetailDialog;
