
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { VoiceCallStatus } from '@/types/voicecall';

interface SettingsCallStatusBadgeProps {
  status: VoiceCallStatus;
}

const SettingsCallStatusBadge: React.FC<SettingsCallStatusBadgeProps> = ({ status }) => {
  const { language } = useTheme();
  
  const getBadgeClasses = (status: VoiceCallStatus) => {
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
  
  const getStatusLabel = (status: VoiceCallStatus) => {
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
    <span className={`px-2 py-1 rounded-full text-xs ${getBadgeClasses(status)}`}>
      {getStatusLabel(status)}
    </span>
  );
};

export default SettingsCallStatusBadge;
