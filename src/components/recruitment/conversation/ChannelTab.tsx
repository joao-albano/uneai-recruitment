
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ChannelIcon from './ChannelIcon';

interface ChannelTabProps {
  value: string;
  icon: 'mail' | 'phone';
  title: string;
  description: string;
}

const ChannelTab: React.FC<ChannelTabProps> = ({
  value,
  icon,
  title,
  description
}) => {
  return (
    <TabsContent 
      value={value} 
      className="flex-1 flex flex-col items-center justify-start p-4 max-h-32"
    >
      <div className="w-full text-center space-y-2 bg-muted/30 p-4 rounded-lg">
        <div className="flex items-center justify-center gap-2">
          <ChannelIcon icon={icon} />
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <Button variant="outline" size="sm">Configurar</Button>
      </div>
    </TabsContent>
  );
};

export default ChannelTab;

