
import { DialingRule } from '@/types/voicecall';
import { mockDialingRules } from './constants';

// Create loading simulation
export const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// Load rules from localStorage with proper date parsing
export const loadRulesFromStorage = (): DialingRule[] => {
  try {
    const savedRules = localStorage.getItem('dialing_rules');
    if (savedRules) {
      // Parse dates properly from JSON
      const parsedRules = JSON.parse(savedRules);
      return parsedRules.map((rule: any) => ({
        ...rule,
        startDate: new Date(rule.startDate),
        endDate: rule.endDate ? new Date(rule.endDate) : null,
        createdAt: new Date(rule.createdAt),
        updatedAt: new Date(rule.updatedAt)
      }));
    }
  } catch (e) {
    console.error('Error loading dialing rules:', e);
  }
  return mockDialingRules;
};

// Save rules to localStorage
export const saveRulesToStorage = (rules: DialingRule[]): void => {
  try {
    localStorage.setItem('dialing_rules', JSON.stringify(rules));
  } catch (e) {
    console.error('Error saving dialing rules to localStorage:', e);
  }
};
