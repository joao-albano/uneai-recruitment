
import React from 'react';
import VoiceCallStats from './VoiceCallStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useVoiceCallHistory } from '@/hooks/useVoiceCallHistory';

const VoiceCallsTabContent: React.FC = () => {
  const { language } = useTheme();
  const voiceCallHistory = useVoiceCallHistory();
  
  return (
    <div className="space-y-6">
      <VoiceCallStats />
      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'pt-BR' ? 'Histórico de Ligações' : 'Call History'}
            </CardTitle>
            <CardDescription>
              {language === 'pt-BR' 
                ? 'Últimas ligações realizadas via IA de voz' 
                : 'Recent voice AI calls made'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto rounded-md border">
              <table className="w-full text-sm text-left">
                <thead className="text-xs bg-muted">
                  <tr>
                    <th className="px-4 py-2">{language === 'pt-BR' ? 'Estudante' : 'Student'}</th>
                    <th className="px-4 py-2">{language === 'pt-BR' ? 'Destinatário' : 'Recipient'}</th>
                    <th className="px-4 py-2">{language === 'pt-BR' ? 'Data' : 'Date'}</th>
                    <th className="px-4 py-2">{language === 'pt-BR' ? 'Duração' : 'Duration'}</th>
                    <th className="px-4 py-2">{language === 'pt-BR' ? 'Status' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody>
                  {voiceCallHistory.calls.slice(0, 5).map((call, index) => (
                    <tr key={call.id || index} className="border-b">
                      <td className="px-4 py-3">{call.studentName}</td>
                      <td className="px-4 py-3">{call.parentName} ({call.recipientNumber})</td>
                      <td className="px-4 py-3">{new Date(call.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3">{call.duration ? `${call.duration}s` : '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          call.status === 'completed' ? 'bg-green-100 text-green-800' :
                          call.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          call.status === 'no-answer' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {call.status === 'completed' ? (language === 'pt-BR' ? 'Completada' : 'Completed') :
                          call.status === 'in-progress' ? (language === 'pt-BR' ? 'Em Andamento' : 'In Progress') :
                          call.status === 'no-answer' ? (language === 'pt-BR' ? 'Sem Resposta' : 'No Answer') :
                          (language === 'pt-BR' ? 'Falha' : 'Failed')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" asChild>
                <Link to="/settings/voice-calls">
                  {language === 'pt-BR' ? 'Ver Todas as Ligações' : 'View All Calls'}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceCallsTabContent;
