
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { VoiceCall } from '@/types/voicecall';
import { FileText, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface CallListProps {
  calls: VoiceCall[];
  onViewCall: (call: VoiceCall) => void;
}

const CallList: React.FC<CallListProps> = ({ calls, onViewCall }) => {
  const { language } = useTheme();
  
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
  
  const handlePlayRecording = (call: VoiceCall) => {
    // In a real implementation, this would play the actual recording
    // For demo purposes, we'll show a toast message
    toast.info(
      language === 'pt-BR' 
        ? `Reproduzindo gravação da ligação para ${call.parentName}...` 
        : `Playing call recording for ${call.parentName}...`
    );
    
    // Simulate a short audio playback
    setTimeout(() => {
      toast.success(
        language === 'pt-BR' 
          ? `Reprodução concluída` 
          : `Playback completed`
      );
    }, 3000);
  };
  
  return (
    <div>
      {calls.length === 0 ? (
        <div className="p-6 text-center text-muted-foreground">
          {language === 'pt-BR' 
            ? 'Nenhuma ligação encontrada com os filtros aplicados.' 
            : 'No calls found matching the applied filters.'}
        </div>
      ) : (
        <div>
          {calls.map(call => (
            <div key={call.id} className="grid grid-cols-12 gap-2 p-3 border-b items-center text-sm">
              <div className="col-span-3 font-medium">{call.studentName}</div>
              <div className="col-span-2">{call.parentName}</div>
              <div className="col-span-2">
                {format(call.createdAt, 'dd/MM/yyyy HH:mm')}
              </div>
              <div className="col-span-2">{formatDuration(call.duration)}</div>
              <div className="col-span-1">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusClasses(call.status)}`}>
                  {getStatusLabel(call.status)}
                </span>
              </div>
              <div className="col-span-2 flex justify-end space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onViewCall(call)}
                  title={language === 'pt-BR' ? 'Ver detalhes' : 'View details'}
                >
                  <FileText className="h-4 w-4" />
                </Button>
                {call.status === 'completed' && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handlePlayRecording(call)}
                    title={language === 'pt-BR' ? 'Ouvir gravação' : 'Play recording'}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CallList;
