
import React from 'react';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { WhatsAppMessage } from '@/types/whatsapp';
import { useTheme } from '@/context/ThemeContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import SettingsMessageStatusBadge from './SettingsMessageStatusBadge';

interface SettingsMessageListProps {
  messages: WhatsAppMessage[];
  onViewMessage: (message: WhatsAppMessage) => void;
}

const SettingsMessageList: React.FC<SettingsMessageListProps> = ({ messages, onViewMessage }) => {
  const { language } = useTheme();
  const dateLocale = language === 'pt-BR' ? ptBR : enUS;
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              {language === 'pt-BR' ? 'Aluno' : 'Student'}
            </TableHead>
            <TableHead>
              {language === 'pt-BR' ? 'Responsável' : 'Parent'}
            </TableHead>
            <TableHead>
              {language === 'pt-BR' ? 'Enviado em' : 'Sent at'}
            </TableHead>
            <TableHead>
              {language === 'pt-BR' ? 'Status' : 'Status'}
            </TableHead>
            <TableHead className="text-right">
              {language === 'pt-BR' ? 'Ações' : 'Actions'}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id}>
              <TableCell className="font-medium">
                {message.studentName}
              </TableCell>
              <TableCell>
                {message.parentName}
                <div className="text-xs text-muted-foreground">
                  {message.recipientNumber}
                </div>
              </TableCell>
              <TableCell>
                {format(message.createdAt, 'dd MMM yyyy, HH:mm', { locale: dateLocale })}
              </TableCell>
              <TableCell>
                <SettingsMessageStatusBadge status={message.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onViewMessage(message)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SettingsMessageList;
