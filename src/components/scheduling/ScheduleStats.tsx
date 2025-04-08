
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

interface ScheduleStatsProps {
  onNewSchedule: () => void;
  onViewReminders: () => void;
}

const ScheduleStats: React.FC<ScheduleStatsProps> = ({ onNewSchedule, onViewReminders }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={onViewReminders}
        >
          <Bell className="h-4 w-4" />
          <span>Histórico de Lembretes</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ScheduleStats;
