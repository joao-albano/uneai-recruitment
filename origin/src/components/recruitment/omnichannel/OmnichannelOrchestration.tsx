
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowDownUp, Settings } from 'lucide-react';
import { useChannels } from './useChannels';
import ChannelTable from './ChannelTable';
import OmnichannelHelp from './OmnichannelHelp';

const OmnichannelOrchestration: React.FC = () => {
  const { 
    channels, 
    editMode, 
    setEditMode, 
    toggleChannel, 
    movePriorityUp, 
    movePriorityDown, 
    setFallback 
  } = useChannels();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownUp className="h-5 w-5" /> Orquestração Omnichannel
              </CardTitle>
              <CardDescription>
                Configure a priorização e fallback entre os canais de comunicação
              </CardDescription>
            </div>
            <Button 
              variant={editMode ? "default" : "outline"}
              size="sm"
              onClick={() => setEditMode(!editMode)}
            >
              <Settings className="h-4 w-4 mr-2" />
              {editMode ? "Salvar Prioridades" : "Editar Prioridades"}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <ChannelTable 
            channels={channels}
            editMode={editMode}
            toggleChannel={toggleChannel}
            setFallback={setFallback}
            movePriorityUp={movePriorityUp}
            movePriorityDown={movePriorityDown}
          />
        </CardContent>
        
        <CardFooter className="flex-col space-y-4">
          <OmnichannelHelp />
        </CardFooter>
      </Card>
    </div>
  );
};

export default OmnichannelOrchestration;
