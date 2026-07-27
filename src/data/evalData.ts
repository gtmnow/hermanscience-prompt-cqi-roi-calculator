import type {
  LatencyEntry,
  Profile,
  RoleProfile,
  TaskDefinition,
  TaskKey,
  TaskTokenUsageRates,
  TaskWinRates,
  TaskTokenSavingsRates,
} from '../types';

export interface LlmProviderPricing {
  provider: string;
  model: string;
  inputCostPerMillion: number;
  outputCostPerMillion: number;
  rationale: string;
}

export const llmProviderPricing: LlmProviderPricing[] = [
  {
    provider: 'OpenAI',
    model: 'GPT-4o mini',
    inputCostPerMillion: 0.15,
    outputCostPerMillion: 0.6,
    rationale:
      'Common, fast, and cost-conscious model across user and API usage workflows.',
  },
  {
    provider: 'OpenAI',
    model: 'GPT-4o',
    inputCostPerMillion: 2.5,
    outputCostPerMillion: 10,
    rationale: 'Widely used flagship model with stronger output quality.',
  },
  {
    provider: 'Anthropic',
    model: 'Claude 3.5 Sonnet',
    inputCostPerMillion: 3,
    outputCostPerMillion: 15,
    rationale: 'Popular productivity baseline across enterprise and professional workloads.',
  },
  {
    provider: 'Google',
    model: 'Gemini 1.5 Flash',
    inputCostPerMillion: 0.075,
    outputCostPerMillion: 0.3,
    rationale: 'High-volume, lower-cost option frequently used by teams on a budget.',
  },
];

const averageInputCostPerMillion =
  llmProviderPricing.reduce((sum, provider) => sum + provider.inputCostPerMillion, 0) /
  llmProviderPricing.length;

const averageOutputCostPerMillion =
  llmProviderPricing.reduce((sum, provider) => sum + provider.outputCostPerMillion, 0) /
  llmProviderPricing.length;

export const DEFAULT_TOKEN_BLEND_RATIO = 0.5;
const calculatedDefaultTokenCostPerMillion = (averageInputCostPerMillion * DEFAULT_TOKEN_BLEND_RATIO +
  averageOutputCostPerMillion * (1 - DEFAULT_TOKEN_BLEND_RATIO));
export const defaultTokenCostPerMillion = Number(calculatedDefaultTokenCostPerMillion.toFixed(2));

export const profiles: Profile[] = [
  { key: 'reformer', label: 'Reformer' },
  { key: 'helper', label: 'Helper' },
  { key: 'achiever', label: 'Achiever' },
  { key: 'individualist', label: 'Individualist' },
  { key: 'investigator', label: 'Investigator' },
  { key: 'loyalist', label: 'Loyalist' },
  { key: 'enthusiast', label: 'Enthusiast' },
  { key: 'challenger', label: 'Challenger' },
  { key: 'peacemaker', label: 'Peacemaker' },
];

export const tasks: TaskDefinition[] = [
  {
    key: 'summarization',
    label: 'Summarization',
    samplePrompt:
      'Summarize the main reason clear evaluation criteria improve scoring consistency.',
  },
  {
    key: 'decision_support',
    label: 'Decision Support',
    samplePrompt:
      'Given inconsistent scoring across reviewers, identify what should be prioritized first to improve consistency.',
  },
  {
    key: 'recommendation',
    label: 'Recommendation',
    samplePrompt:
      'Recommend the best approach to reduce inconsistent scoring across reviewers.',
  },
  {
    key: 'ideation',
    label: 'Ideation',
    samplePrompt: 'Generate ideas to improve scoring consistency across reviewers.',
  },
  {
    key: 'explanation',
    label: 'Explanation',
    samplePrompt: 'Explain why clear evaluation criteria improve scoring consistency.',
  },
  {
    key: 'risk_analysis',
    label: 'Risk Analysis',
    samplePrompt:
      'Identify the main risks and tradeoffs involved in changing the scoring process to improve consistency.',
  },
  {
    key: 'writing',
    label: 'Writing',
    samplePrompt:
      'Write a short executive email explaining why inconsistent scoring across reviewers is a problem and what should be done about it.',
  },
];

export const defaultTaskMix: Record<TaskKey, number> = {
  summarization: 0.2,
  decision_support: 0.1,
  recommendation: 0.05,
  ideation: 0.05,
  explanation: 0.1,
  risk_analysis: 0,
  writing: 0.5,
};

const evenlyDistributedTaskMix: Record<TaskKey, number> = Object.fromEntries(
  tasks.map((task) => [task.key, 1 / tasks.length]),
) as Record<TaskKey, number>;

export const roles: RoleProfile[] = [
  {
    key: 'marketing',
    label: 'Marketing',
    description: 'Campaign and demand-generation heavy tasks.',
    defaultWeeklyLlmHours: 15,
    defaultAnnualSalary: 156000,
    taskMix: {
      summarization: 0.12,
      decision_support: 0.08,
      recommendation: 0.24,
      ideation: 0.14,
      explanation: 0.16,
      risk_analysis: 0.05,
      writing: 0.21,
    },
  },
  {
    key: 'sales',
    label: 'Sales',
    description: 'Outbound, enablement, and proposal-heavy workflows.',
    defaultWeeklyLlmHours: 7.5,
    defaultAnnualSalary: 170000,
    taskMix: {
      summarization: 0.18,
      decision_support: 0.24,
      recommendation: 0.22,
      ideation: 0.08,
      explanation: 0.12,
      risk_analysis: 0.03,
      writing: 0.13,
    },
  },
  {
    key: 'customer_support',
    label: 'Customer Support',
    description: 'Support triage and customer response operations.',
    defaultWeeklyLlmHours: 5,
    defaultAnnualSalary: 95000,
    taskMix: {
      summarization: 0.22,
      decision_support: 0.3,
      recommendation: 0.08,
      ideation: 0.05,
      explanation: 0.08,
      risk_analysis: 0.02,
      writing: 0.25,
    },
  },
  {
    key: 'product',
    label: 'Product',
    description: 'Research, roadmap, and cross-functional planning tasks.',
    defaultWeeklyLlmHours: 10,
    defaultAnnualSalary: 185000,
    taskMix: {
      summarization: 0.16,
      decision_support: 0.12,
      recommendation: 0.11,
      ideation: 0.2,
      explanation: 0.18,
      risk_analysis: 0.08,
      writing: 0.15,
    },
  },
  {
    key: 'leadership',
    label: 'Leadership',
    description: 'Communications, execution planning, and executive updates.',
    defaultWeeklyLlmHours: 7.5,
    defaultAnnualSalary: 260000,
    taskMix: {
      summarization: 0.08,
      decision_support: 0.18,
      recommendation: 0.1,
      ideation: 0.1,
      explanation: 0.26,
      risk_analysis: 0.12,
      writing: 0.16,
    },
  },
  {
    key: 'operations',
    label: 'Operations',
    description: 'Process, coordination, and risk-control workflows.',
    defaultWeeklyLlmHours: 10,
    defaultAnnualSalary: 125000,
    taskMix: {
      summarization: 0.14,
      decision_support: 0.2,
      recommendation: 0.06,
      ideation: 0.06,
      explanation: 0.14,
      risk_analysis: 0.24,
      writing: 0.16,
    },
  },
  {
    key: 'user_defined',
    label: 'User Defined',
    description: 'Even starting mix for custom role definitions.',
    defaultWeeklyLlmHours: 10,
    defaultAnnualSalary: 120000,
    taskMix: evenlyDistributedTaskMix,
  },
];

export const taskWinRates: TaskWinRates[] = [
  {
    task: 'summarization',
    values: {
      reformer: 0.9,
      helper: 0.8,
      achiever: 1,
      individualist: 1,
      investigator: 1,
      loyalist: 0.9,
      enthusiast: 1,
      challenger: 0.7,
      peacemaker: 0.2,
    },
  },
  {
    task: 'decision_support',
    values: {
      reformer: 0.7,
      helper: 0.3,
      achiever: 0.3,
      individualist: 0.7,
      investigator: 0.5,
      loyalist: 1,
      enthusiast: 1,
      challenger: 0.2,
      peacemaker: 0.4,
    },
  },
  {
    task: 'recommendation',
    values: {
      reformer: 0.3,
      helper: 0,
      achiever: 0,
      individualist: 0,
      investigator: 0.4,
      loyalist: 0.2,
      enthusiast: 0.5,
      challenger: 0.1,
      peacemaker: 0.1,
    },
  },
  {
    task: 'ideation',
    values: {
      reformer: 0,
      helper: 0,
      achiever: 0,
      individualist: 0.6,
      investigator: 0.5,
      loyalist: 0.2,
      enthusiast: 0,
      challenger: 0.1,
      peacemaker: 0,
    },
  },
  {
    task: 'explanation',
    values: {
      reformer: 0,
      helper: 0,
      achiever: 0.1,
      individualist: 0.4,
      investigator: 0.2,
      loyalist: 0,
      enthusiast: 0,
      challenger: 0,
      peacemaker: 0,
    },
  },
  {
    task: 'risk_analysis',
    values: {
      reformer: 0.4,
      helper: 0.1,
      achiever: 0,
      individualist: 0.2,
      investigator: 0,
      loyalist: 0,
      enthusiast: 0,
      challenger: 0,
      peacemaker: 0,
    },
  },
  {
    task: 'writing',
    values: {
      reformer: 0.6,
      helper: 0.2,
      achiever: 0.5,
      individualist: 0.6,
      investigator: 0.3,
      loyalist: 0.5,
      enthusiast: 0.1,
      challenger: 0.2,
      peacemaker: 0,
    },
  },
];

export const taskTokenUsageRates: TaskTokenUsageRates[] = [
  {
    task: 'summarization',
    values: {
      reformer: 256.59,
      helper: 281.73,
      achiever: 269.82,
      individualist: 261.09,
      investigator: 241.2,
      loyalist: 259.05,
      enthusiast: 306.66,
      challenger: 248.49,
      peacemaker: 247.2,
    },
  },
  {
    task: 'decision_support',
    values: {
      reformer: 676.83,
      helper: 612.3,
      achiever: 609.66,
      individualist: 776.07,
      investigator: 500.04,
      loyalist: 706.86,
      enthusiast: 603.9,
      challenger: 429.51,
      peacemaker: 637.59,
    },
  },
  {
    task: 'recommendation',
    values: {
      reformer: 472.23,
      helper: 358.08,
      achiever: 357.54,
      individualist: 431.7,
      investigator: 281.49,
      loyalist: 406.44,
      enthusiast: 339.45,
      challenger: 269.43,
      peacemaker: 290.16,
    },
  },
  {
    task: 'ideation',
    values: {
      reformer: 669.39,
      helper: 596.1,
      achiever: 686.55,
      individualist: 651.6,
      investigator: 598.26,
      loyalist: 700.11,
      enthusiast: 615.57,
      challenger: 415.5,
      peacemaker: 534.24,
    },
  },
  {
    task: 'explanation',
    values: {
      reformer: 512.43,
      helper: 397.5,
      achiever: 558.66,
      individualist: 700.02,
      investigator: 270.3,
      loyalist: 537.03,
      enthusiast: 445.05,
      challenger: 249.09,
      peacemaker: 384.42,
    },
  },
  {
    task: 'risk_analysis',
    values: {
      reformer: 725.64,
      helper: 633.12,
      achiever: 502.98,
      individualist: 792.51,
      investigator: 460.65,
      loyalist: 654.24,
      enthusiast: 548.28,
      challenger: 394.98,
      peacemaker: 610.44,
    },
  },
  {
    task: 'writing',
    values: {
      reformer: 338.13,
      helper: 307.98,
      achiever: 310.17,
      individualist: 403.71,
      investigator: 326.28,
      loyalist: 374.13,
      enthusiast: 346.8,
      challenger: 268.32,
      peacemaker: 302.4,
    },
  },
];

export const tokenSavingsRates: TaskTokenSavingsRates[] = [
  {
    task: 'summarization',
    values: {
      reformer: 0.0599,
      helper: 0.1438,
      achiever: 0.106,
      individualist: 0.0761,
      investigator: 0,
      loyalist: 0.0689,
      enthusiast: 0.2134,
      challenger: 0.0293,
      peacemaker: 0.0242,
    },
  },
  {
    task: 'decision_support',
    values: {
      reformer: 0.2612,
      helper: 0.1833,
      achiever: 0.1798,
      individualist: 0.3557,
      investigator: 0,
      loyalist: 0.2926,
      enthusiast: 0.172,
      challenger: 0,
      peacemaker: 0.2157,
    },
  },
  {
    task: 'recommendation',
    values: {
      reformer: 0.3856,
      helper: 0.1897,
      achiever: 0.1885,
      individualist: 0.3279,
      investigator: 0,
      loyalist: 0.2861,
      enthusiast: 0.1452,
      challenger: 0,
      peacemaker: 0,
    },
  },
  {
    task: 'ideation',
    values: {
      reformer: 0.166,
      helper: 0.0634,
      achiever: 0.1868,
      individualist: 0.1432,
      investigator: 0.0668,
      loyalist: 0.2026,
      enthusiast: 0.093,
      challenger: 0,
      peacemaker: 0,
    },
  },
  {
    task: 'explanation',
    values: {
      reformer: 0.2498,
      helper: 0.0329,
      achiever: 0.3119,
      individualist: 0.4508,
      investigator: 0,
      loyalist: 0.2842,
      enthusiast: 0.1362,
      challenger: 0,
      peacemaker: 0,
    },
  },
  {
    task: 'risk_analysis',
    values: {
      reformer: 0.3653,
      helper: 0.2056,
      achiever: 0,
      individualist: 0.3653,
      investigator: 0,
      loyalist: 0.2312,
      enthusiast: 0.0826,
      challenger: 0,
      peacemaker: 0.176,
    },
  },
  {
    task: 'writing',
    values: {
      reformer: 0.3068,
      helper: 0.0182,
      achiever: 0.0251,
      individualist: 0.251,
      investigator: 0.0732,
      loyalist: 0.1917,
      enthusiast: 0.1281,
      challenger: 0,
      peacemaker: 0,
    },
  },
];

export const latencyData: LatencyEntry[] = [
  {
    task: 'summarization',
    neutral: 12.5,
    values: {
      reformer: 2.8,
      helper: 2.9,
      achiever: 1.9,
      individualist: 2.9,
      investigator: 2.1,
      loyalist: 2.7,
      enthusiast: 2.2,
      challenger: 2.1,
      peacemaker: 3.8,
    },
  },
  {
    task: 'decision_support',
    neutral: 5,
    values: {
      reformer: 13,
      helper: 15.6,
      achiever: 6.7,
      individualist: 8.3,
      investigator: 10.2,
      loyalist: 14.1,
      enthusiast: 16.6,
      challenger: 9.2,
      peacemaker: 15.7,
    },
  },
  {
    task: 'recommendation',
    neutral: 19,
    values: {
      reformer: 9.6,
      helper: 19,
      achiever: 15.1,
      individualist: 19.1,
      investigator: 13.1,
      loyalist: 18.8,
      enthusiast: 20.1,
      challenger: 17.7,
      peacemaker: 18.1,
    },
  },
  {
    task: 'ideation',
    neutral: 21,
    values: {
      reformer: 14.7,
      helper: 18.4,
      achiever: 14.8,
      individualist: 27.8,
      investigator: 16.1,
      loyalist: 23.3,
      enthusiast: 20.6,
      challenger: 17.5,
      peacemaker: 18.9,
    },
  },
  {
    task: 'explanation',
    neutral: 13.7,
    values: {
      reformer: 14.5,
      helper: 8.9,
      achiever: 2.5,
      individualist: 18.2,
      investigator: 17.3,
      loyalist: 16.4,
      enthusiast: 9.7,
      challenger: 5.6,
      peacemaker: 4.7,
    },
  },
  {
    task: 'risk_analysis',
    neutral: 18.9,
    values: {
      reformer: 21.9,
      helper: 20.6,
      achiever: 9,
      individualist: 26.2,
      investigator: 23.4,
      loyalist: 22.5,
      enthusiast: 26.8,
      challenger: 16.1,
      peacemaker: 15.3,
    },
  },
  {
    task: 'writing',
    neutral: 6.6,
    values: {
      reformer: 10.7,
      helper: 6.4,
      achiever: 6.4,
      individualist: 12.4,
      investigator: 11.7,
      loyalist: 12.1,
      enthusiast: 9.8,
      challenger: 9.6,
      peacemaker: 9.1,
    },
  },
];

export const observations: string[] = [
  'AI performance depends on matching the thinking style to the task.',
  'Different tasks have different efficiency versus quality curves.',
  'Profile-driven prompting does not universally improve outcomes. It depends on the task.',
  'The structure of the prompt either matches the task or fights it.',
];
