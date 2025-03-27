
export const getRelativeDates = () => {
  const today = new Date();
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  
  const threeDaysAhead = new Date(today);
  threeDaysAhead.setDate(threeDaysAhead.getDate() + 3);
  
  const fourDaysAhead = new Date(today);
  fourDaysAhead.setDate(fourDaysAhead.getDate() + 4);
  
  const twoWeeksAhead = new Date(today);
  twoWeeksAhead.setDate(twoWeeksAhead.getDate() + 14);
  
  return { 
    today, 
    tomorrow, 
    yesterday, 
    nextWeek, 
    lastWeek, 
    twoDaysAgo, 
    threeDaysAhead, 
    fourDaysAhead, 
    twoWeeksAhead 
  };
};

export const createDateWithTime = (
  baseDate: Date, 
  hours: number, 
  minutes: number
) => {
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const formatDateForDisplay = (date: Date) => {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export const formatTimeForDisplay = (date: Date) => {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
