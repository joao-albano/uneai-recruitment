
import { ScheduleItem } from '@/types/data';
import { generateTodaySchedules } from './schedules/todaySchedules';
import { generateUpcomingSchedules } from './schedules/upcomingSchedules';
import { generatePastSchedules } from './schedules/pastSchedules';

export const generateDemoSchedules = (): ScheduleItem[] => {
  // Combine all schedule types into a single array
  return [
    ...generateTodaySchedules(),
    ...generateUpcomingSchedules(),
    ...generatePastSchedules()
  ];
};
