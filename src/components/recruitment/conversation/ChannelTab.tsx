
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <TabsContent value={value} className="flex-1 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-4">
        <div className="bg-muted/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
          {icon === 'mail' && <Mail className="h-8 w-8 text-primary" />}
          {icon === 'phone' && <Phone className="h-8 w-8 text-primary" />}
        </div>
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <Button variant="outline" className="mt-4">
          Configurar integração
        </Button>
      </div>
    </TabsContent>
  );
};

export default ChannelTab;
