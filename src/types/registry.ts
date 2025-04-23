
export type RegistryRuleType = 'human' | 'ai';
export type RegistryResultType = 'positive' | 'negative' | 'neutral';

export interface RegistryRule {
  id: string;
  code: string;
  description: string;
  type: RegistryRuleType;
  resultType: RegistryResultType;
  requiresFollowUp: boolean;
  automaticActions: string[];
  status: 'active' | 'inactive';
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddRegistryRuleParams {
  code: string;
  description: string;
  type: RegistryRuleType;
  resultType: RegistryResultType;
  requiresFollowUp: boolean;
  automaticActions: string[];
  category: string;
}

export interface UpdateRegistryRuleParams extends Partial<AddRegistryRuleParams> {
  status?: 'active' | 'inactive';
}
