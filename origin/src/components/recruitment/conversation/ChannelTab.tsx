
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
      className="hidden data-[state=active]:flex h-0 data-[state=active]:h-auto"
    >
      <div className="w-full flex items-center justify-center gap-4 py-2 px-4 bg-muted/20">
        <ChannelIcon icon={icon} />
        <div className="flex-1">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <Button variant="outline" size="sm">Configurar</Button>
      </div>
    </TabsContent>
  );
};

export default ChannelTab;
