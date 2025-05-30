
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useWhatsAppHistory } from '@/hooks/useWhatsAppHistory';
import WhatsappStats from './WhatsappStats';

const WhatsAppTabContent: React.FC = () => {
  const { language } = useTheme();
  const whatsAppHistory = useWhatsAppHistory();
  
  return (
    <div className="space-y-6">
      <WhatsappStats />
      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'pt-BR' ? 'Histórico de Mensagens' : 'Message History'}
            </CardTitle>
            <CardDescription>
              {language === 'pt-BR' 
                ? 'Últimas mensagens enviadas via WhatsApp' 
                : 'Recent WhatsApp messages sent'}
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
                    <th className="px-4 py-2">{language === 'pt-BR' ? 'Status' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody>
                  {whatsAppHistory.messages.slice(0, 5).map((msg, index) => (
                    <tr key={msg.id || index} className="border-b">
                      <td className="px-4 py-3">{msg.studentName}</td>
                      <td className="px-4 py-3">{msg.parentName} ({msg.recipientNumber})</td>
                      <td className="px-4 py-3">{new Date(msg.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          msg.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                          msg.status === 'delivered' ? 'bg-yellow-100 text-yellow-800' :
                          msg.status === 'read' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {msg.status === 'sent' ? (language === 'pt-BR' ? 'Enviado' : 'Sent') :
                          msg.status === 'delivered' ? (language === 'pt-BR' ? 'Entregue' : 'Delivered') :
                          msg.status === 'read' ? (language === 'pt-BR' ? 'Lido' : 'Read') :
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
                <Link to="/settings/whatsapp">
                  {language === 'pt-BR' ? 'Ver Todas as Mensagens' : 'View All Messages'}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhatsAppTabContent;
