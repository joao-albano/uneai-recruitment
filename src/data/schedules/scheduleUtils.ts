
/**
 * Utility functions for schedule generation
 */

// Generate date objects relative to today
export const getRelativeDates = () => {
  const today = new Date();
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);
  
  const threeDaysAhead = new Date(today);
  threeDaysAhead.setDate(today.getDate() + 3);
  
  const fourDaysAhead = new Date(today);
  fourDaysAhead.setDate(today.getDate() + 4);
  
  const twoWeeksAhead = new Date(today);
  twoWeeksAhead.setDate(today.getDate() + 14);
  
  return {
    today,
    tomorrow,
    nextWeek,
    yesterday,
    lastWeek,
    twoDaysAgo,
    threeDaysAhead,
    fourDaysAhead,
    twoWeeksAhead
  };
};

// Create a date with specific time
export const createDateWithTime = (date: Date, hours: number, minutes: number): Date => {
  return new Date(
    date.getFullYear(), 
    date.getMonth(), 
    date.getDate(), 
    hours, 
    minutes
  );
};
