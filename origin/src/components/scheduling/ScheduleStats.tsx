
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

interface ScheduleStatsProps {
  onNewSchedule: () => void;
  onViewReminders: () => void;
}

const ScheduleStats: React.FC<ScheduleStatsProps> = ({ onNewSchedule, onViewReminders }) => {
  // Return null to remove the component from rendering
  return null;
};

export default ScheduleStats;
