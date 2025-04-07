
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, PhoneCall, Mail, MessagesSquare, User, Bot } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from '@/components/ui/table';

interface ChannelData {
  name: string;
  total: number;
  human: number;
  ai: number;
}

interface ChannelDistributionTableProps {
  data: ChannelData[];
}

const ChannelDistributionTable: React.FC<ChannelDistributionTableProps> = ({ data }) => {
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Ligações Ativas':
        return <Phone className="h-5 w-5 text-blue-600" />;
      case 'Ligações Receptivas':
        return <PhoneCall className="h-5 w-5 text-green-600" />;
      case 'WhatsApp':
        return <MessagesSquare className="h-5 w-5 text-green-500" />;
      case 'E-mail':
        return <Mail className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const totalHuman = data.reduce((sum, channel) => sum + channel.human, 0);
  const totalAI = data.reduce((sum, channel) => sum + channel.ai, 0);
  const grandTotal = totalHuman + totalAI;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detalhamento de Canais (Humano vs IA)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Canal</TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>Humano</span>
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center">
                    <Bot className="h-4 w-4 mr-1" />
                    <span>IA</span>
                  </div>
                </TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">% Humano</TableHead>
                <TableHead className="text-center">% IA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((channel, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center">
                      {getChannelIcon(channel.name)}
                      <span className="ml-2">{channel.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{channel.human}</TableCell>
                  <TableCell className="text-center">{channel.ai}</TableCell>
                  <TableCell className="text-center font-medium">{channel.total}</TableCell>
                  <TableCell className="text-center">
                    {((channel.human / channel.total) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-center">
                    {((channel.ai / channel.total) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50">
                <TableCell className="font-medium">Total</TableCell>
                <TableCell className="text-center font-medium">
                  {totalHuman}
                </TableCell>
                <TableCell className="text-center font-medium">
                  {totalAI}
                </TableCell>
                <TableCell className="text-center font-medium">
                  {grandTotal}
                </TableCell>
                <TableCell className="text-center font-medium">
                  {((totalHuman / grandTotal) * 100).toFixed(1)}%
                </TableCell>
                <TableCell className="text-center font-medium">
                  {((totalAI / grandTotal) * 100).toFixed(1)}%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelDistributionTable;
