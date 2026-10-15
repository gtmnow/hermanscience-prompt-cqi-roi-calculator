export type TaskKey =
  | 'summarization'
  | 'decision_support'
  | 'recommendation'
  | 'ideation'
  | 'explanation'
  | 'risk_analysis'
  | 'writing';

export type ProfileKey =
  | 'reformer'
  | 'helper'
  | 'achiever'
  | 'individualist'
  | 'investigator'
  | 'loyalist'
  | 'enthusiast'
  | 'challenger'
  | 'peacemaker';

export type RoleKey =
  | 'marketing'
  | 'sales'
  | 'customer_support'
  | 'product'
  | 'leadership'
  | 'operations'
  | 'user_defined';

export interface TaskDefinition {
  key: TaskKey;
  label: string;
  samplePrompt: string;
}

export interface Profile {
  key: ProfileKey;
  label: string;
}

export interface RoleProfile {
  key: RoleKey;
  label: string;
  taskMix: Record<TaskKey, number>;
  description: string;
  defaultWeeklyLlmHours: number;
  defaultAnnualSalary: number;
}

export interface TaskWinRates {
  task: TaskKey;
  values: Record<ProfileKey, number>;
}

export interface TaskTokenUsageRates {
  task: TaskKey;
  values: Record<ProfileKey, number>;
}

export interface TaskTokenSavingsRates {
  task: TaskKey;
  values: Record<ProfileKey, number>;
}

export interface LatencyEntry {
  task: TaskKey;
  neutral: number;
  values: Record<ProfileKey, number>;
}

export interface Inputs {
  profileKey: ProfileKey;
  roleKey: RoleKey;
  weeklyLlmHours: number;
  annualSalary: number;
  tokenCostPerMillion: number;
  taskMix: Record<TaskKey, number>;
}

export interface TaskOpportunity {
  task: TaskKey;
  taskLabel: string;
  selectedRate: number;
  bestRate: number;
  selectedTokenUsageRate: number;
  selectedTokenSavingsRate: number;
  gap: number;
  mix: number;
  weightedGap: number;
  selectedLatency: number;
  neutralLatency: number;
  weightedTokenUsage: number;
  weightedTokenSavings: number;
}

export interface CalculatorResult {
  calculatedProductivityFactor: number;
  calculatedTokenSavingsFactor: number;
  weeklyTokenConsumption: number;
  annualTokenConsumption: number;
  weeklyHoursRecovered: number;
  annualHoursRecovered: number;
  weeklyValueCreated: number;
  annualValueCreated: number;
  weeklyTokenSavings: number;
  annualTokenSavings: number;
  weeklyTokenValueCreated: number;
  annualTokenValueCreated: number;
  taskRows: TaskOpportunity[];
  mixTotal: number;
  isMixValid: boolean;
}
