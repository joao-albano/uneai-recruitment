import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';

// Default trial period in days
const DEFAULT_TRIAL_PERIOD = 14;

export const useTrialPeriod = () => {
  const { currentUser } = useAuth();
  const [daysRemaining, setDaysRemaining] = useState<number>(DEFAULT_TRIAL_PERIOD);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  
  useEffect(() => {
    // This is a mock implementation - in a real app, you would:
    // 1. Store the user creation date in your database
    // 2. Fetch subscription status from your payment provider
    
    if (!currentUser) {
      setShowBanner(false);
      return;
    }
    
    // For demo purposes, we're using localStorage to simulate a start date
    // In a real implementation, this would come from your backend
    const trialStartKey = `trial_start_${currentUser.email}`;
    let trialStartDate = localStorage.getItem(trialStartKey);
    
    // If no start date is recorded, set it now
    if (!trialStartDate) {
      trialStartDate = new Date().toISOString();
      localStorage.setItem(trialStartKey, trialStartDate);
    }
    
    // Check if the user has an active subscription
    // This is a mock - in a real app, check your payment provider
    const hasPaidPlan = localStorage.getItem(`user_plan_${currentUser.email}`);
    
    if (hasPaidPlan) {
      // User has a paid plan, don't show the banner
      setShowBanner(false);
      return;
    }
    
    // Calculate days remaining in trial
    const startDate = new Date(trialStartDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + DEFAULT_TRIAL_PERIOD);
    
    const now = new Date();
    const msRemaining = endDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));
    
    setDaysRemaining(daysLeft);
    setShowBanner(true);
  }, [currentUser]);
  
  return {
    daysRemaining,
    showBanner,
    isExpired: daysRemaining <= 0,
    trialPeriodDays: DEFAULT_TRIAL_PERIOD
  };
};
