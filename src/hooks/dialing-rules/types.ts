
import { DialingFailureType, DialingRule, RedialInterval, RuleSegmentation } from '@/types/voicecall';

export interface AddRuleParams extends Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'> {}

export interface UpdateRuleParams extends Partial<Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'>> {}

export interface DialingRulesState {
  rules: DialingRule[];
  loading: boolean;
}

export interface DialingRuleOperationResult {
  success: boolean;
  error?: string;
}
