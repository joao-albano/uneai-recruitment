
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConversationHistory } from "../../types/history";

interface HistoryItemProps {
  item: ConversationHistory;
}

export const HistoryItem = ({ item }: HistoryItemProps) => {
  return (
    <Card key={item.id} className="mb-4 p-4 hover:bg-accent/5 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm text-muted-foreground">Atendente:</span>
            <span className="font-medium">{item.agent}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {format(item.date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <span className="text-sm font-medium text-muted-foreground">Status:</span>
            <span className={`text-sm font-medium ${
              item.status === 'completed' ? 'text-green-600' : 
              item.status === 'missed' ? 'text-red-600' : 
              'text-orange-600'
            }`}>
              {item.status === 'completed' ? 'Concluído' : 
               item.status === 'missed' ? 'Perdido' : 
               'Cancelado'}
            </span>
          </div>
          {item.registryCode && (
            <div className="flex items-center gap-2 justify-end mt-1">
              <span className="text-sm font-medium text-muted-foreground">Tabulação:</span>
              <span className="text-sm">{item.registryCode} - {item.registryDescription}</span>
            </div>
          )}
        </div>
      </div>
      
      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
        {item.channel === 'voz' ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Duração:</span>
              <span className="text-sm">
                {Math.floor(item.duration! / 60)}:{(item.duration! % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.transcription}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {item.messages.map((message) => (
              <div key={message.id} className={`flex ${message.isFromLead ? 'justify-start' : 'justify-end'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.isFromLead 
                    ? 'bg-secondary text-secondary-foreground' 
                    : 'bg-primary text-primary-foreground'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {format(message.timestamp, "HH:mm")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};
