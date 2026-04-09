import type {
  LatencyEntry,
  Profile,
  TaskDefinition,
  TaskKey,
  TaskWinRates,
} from '../types';

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
