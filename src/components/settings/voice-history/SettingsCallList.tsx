
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { VoiceCall } from '@/types/voicecall';
import { Button } from '@/components/ui/button';
import { Play, FileText } from 'lucide-react';
import SettingsCallStatusBadge from './SettingsCallStatusBadge';

interface SettingsCallListProps {
  calls: VoiceCall[];
  onViewCall: (call: VoiceCall) => void;
  onPlayRecording?: (call: VoiceCall) => void;
}

const SettingsCallList: React.FC<SettingsCallListProps> = ({ calls, onViewCall, onPlayRecording }) => {
  const { language } = useTheme();
  
  // Format call duration from seconds to MM:SS
  const formatDuration = (seconds: number | null) => {
    if (seconds === null) return '-';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="relative overflow-x-auto rounded-md border">
      <table className="w-full text-sm text-left">
        <thead className="text-xs bg-muted">
          <tr>
            <th className="px-4 py-2">{language === 'pt-BR' ? 'Estudante' : 'Student'}</th>
            <th className="px-4 py-2">{language === 'pt-BR' ? 'Destinatário' : 'Recipient'}</th>
            <th className="px-4 py-2">{language === 'pt-BR' ? 'Data' : 'Date'}</th>
            <th className="px-4 py-2">{language === 'pt-BR' ? 'Duração' : 'Duration'}</th>
            <th className="px-4 py-2">{language === 'pt-BR' ? 'Status' : 'Status'}</th>
            <th className="px-4 py-2">{language === 'pt-BR' ? 'Ações' : 'Actions'}</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call) => (
            <tr key={call.id} className="border-b">
              <td className="px-4 py-3">{call.studentName}</td>
              <td className="px-4 py-3">{call.parentName} ({call.recipientNumber})</td>
              <td className="px-4 py-3">
                {call.createdAt.toLocaleString(language === 'pt-BR' ? 'pt-BR' : 'en-US')}
              </td>
              <td className="px-4 py-3">{formatDuration(call.duration)}</td>
              <td className="px-4 py-3">
                <SettingsCallStatusBadge status={call.status} />
              </td>
              <td className="px-4 py-3 text-right">
                {call.status === 'completed' && (
                  <div className="flex justify-end gap-2">
                    {onPlayRecording && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => onPlayRecording(call)}
                        title={language === 'pt-BR' ? 'Ouvir gravação' : 'Play recording'}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    {call.transcription && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => onViewCall(call)}
                        title={language === 'pt-BR' ? 'Ver detalhes' : 'View details'}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
                {call.status !== 'completed' && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => onViewCall(call)}
                    title={language === 'pt-BR' ? 'Ver detalhes' : 'View details'}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SettingsCallList;
