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
  return;
};
export default ChannelTab;