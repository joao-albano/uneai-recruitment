
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowDownUp, Clock } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ChannelConfig, ChannelType } from './types';
import { getChannelStatusIcon, getChannelStatusText } from './channelUtils';

interface ChannelTableProps {
  channels: ChannelConfig[];
  editMode: boolean;
  toggleChannel: (id: string) => void;
  setFallback: (channelId: string, fallbackId: string) => void;
  movePriorityUp: (id: string) => void;
  movePriorityDown: (id: string) => void;
}

const ChannelTable: React.FC<ChannelTableProps> = ({
  channels,
  editMode,
  toggleChannel,
  setFallback,
  movePriorityUp,
  movePriorityDown
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">#</TableHead>
          <TableHead>Canal</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Taxa de Resposta</TableHead>
          <TableHead>Tempo Médio</TableHead>
          <TableHead>Fallback</TableHead>
          <TableHead className="w-20 text-right">Ativo</TableHead>
          {editMode && <TableHead className="w-20">Ordem</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {channels.sort((a, b) => a.priority - b.priority).map((channel) => (
          <TableRow key={channel.id}>
            <TableCell>{channel.priority}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <channel.icon className="h-4 w-4" />
                <span>{channel.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                {getChannelStatusIcon(channel.status)}
                <span className="text-sm">{getChannelStatusText(channel.status)}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      channel.responseRate > 80 ? 'bg-green-500' : 
                      channel.responseRate > 50 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${channel.responseRate}%` }}
                  ></div>
                </div>
                <span className="text-sm">{channel.responseRate}%</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{channel.averageTime}</span>
              </div>
            </TableCell>
            <TableCell>
              <select
                className="w-full h-8 rounded-md border border-input bg-background text-sm"
                value={channel.fallbackTo || ''}
                onChange={(e) => setFallback(channel.id, e.target.value)}
                disabled={!channel.enabled || !editMode}
              >
                <option value="">Nenhum</option>
                {channels
                  .filter(c => c.id !== channel.id && c.enabled)
                  .map(c => (
                    <option key={`${channel.id}-fallback-${c.id}`} value={c.id}>
                      {c.name}
                    </option>
                  ))
                }
              </select>
            </TableCell>
            <TableCell className="text-right">
              <Switch
                checked={channel.enabled}
                onCheckedChange={() => toggleChannel(channel.id)}
                aria-label={`Ativar ${channel.name}`}
              />
            </TableCell>
            {editMode && (
              <TableCell>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7" 
                    onClick={() => movePriorityUp(channel.id)}
                    disabled={channel.priority === 1}
                  >
                    <ArrowDownUp className="h-3.5 w-3.5 rotate-180" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7" 
                    onClick={() => movePriorityDown(channel.id)}
                    disabled={channel.priority === channels.length}
                  >
                    <ArrowDownUp className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ChannelTable;
