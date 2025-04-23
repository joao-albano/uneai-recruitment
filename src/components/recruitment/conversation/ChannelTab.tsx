
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
      className="flex-1 flex flex-col items-center justify-center p-4"
    >
      <div className="max-w-md w-full text-center space-y-4 bg-muted/50 p-6 rounded-lg">
        <ChannelIcon icon={icon} />
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button variant="outline">Configurar</Button>
      </div>
    </TabsContent>
  );
};

export default ChannelTab;
