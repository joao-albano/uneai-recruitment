
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useVoiceCallHistory } from '@/hooks/useVoiceCallHistory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VoiceCallHistory from '../VoiceCallHistory';

const VoiceCallHistoryTab: React.FC = () => {
  const { language } = useTheme();
  const { calls } = useVoiceCallHistory();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>
          {language === 'pt-BR' ? 'Histórico de Ligações' : 'Call History'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Histórico de ligações realizadas via IA de voz' 
            : 'History of calls made via voice AI'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VoiceCallHistory 
          calls={calls}
        />
      </CardContent>
    </Card>
  );
};

export default VoiceCallHistoryTab;
