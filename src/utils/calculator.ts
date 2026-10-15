import {
  defaultTaskMix,
  latencyData,
  taskTokenUsageRates,
  taskWinRates,
  tokenSavingsRates,
  tasks,
} from '../data/evalData';
import type { CalculatorResult, Inputs } from '../types';

const promptsPerHour = 60;
const taskTokenMultiplier = 40;

export function calculateRoi(inputs: Inputs): CalculatorResult {
  const rawTaskMixTotal = tasks.reduce(
    (sum, task) => sum + (inputs.taskMix[task.key] ?? defaultTaskMix[task.key]),
    0,
  );

  const normalizeTaskMix =
    Math.abs(rawTaskMixTotal - 1) > 0.00001 && rawTaskMixTotal > 0
      ? Object.fromEntries(tasks.map((task) => [task.key, (inputs.taskMix[task.key] ?? defaultTaskMix[task.key]) / rawTaskMixTotal]))
      : { ...inputs.taskMix };

  const taskRows = tasks.map((task) => {
    const winRow = taskWinRates.find((row) => row.task === task.key);
    const latencyRow = latencyData.find((row) => row.task === task.key);
    const tokenUsageRow = taskTokenUsageRates.find((row) => row.task === task.key);
    const tokenRow = tokenSavingsRates.find((row) => row.task === task.key);

    if (!winRow || !latencyRow || !tokenUsageRow || !tokenRow) {
      throw new Error(`Missing task data for ${task.key}`);
    }

    const selectedRate = winRow.values[inputs.profileKey];
    const selectedLatency = latencyRow.values[inputs.profileKey];
    const selectedTokenUsageRate = tokenUsageRow.values[inputs.profileKey];
    const taskSavingsRates = Object.values(tokenRow.values);
    const averageTokenSavingsRate = taskSavingsRates.length
      ? taskSavingsRates.reduce((sum, value) => sum + value, 0) / taskSavingsRates.length
      : 0;

    if (selectedRate == null) {
      throw new Error(`Missing win-rate data for profile ${inputs.profileKey} on task ${task.key}`);
    }

    if (selectedLatency == null) {
      throw new Error(`Missing latency data for profile ${inputs.profileKey} on task ${task.key}`);
    }

    if (selectedTokenUsageRate == null) {
      throw new Error(
        `Missing token usage data for profile ${inputs.profileKey} on task ${task.key}`,
      );
    }

    if (taskSavingsRates.length === 0) {
      throw new Error(
        `Missing token savings data for task ${task.key}`,
      );
    }

    const bestRate = Math.max(...Object.values(winRow.values));
    const gap = Math.max(0, bestRate - selectedRate);
    const mix = normalizeTaskMix[task.key] ?? defaultTaskMix[task.key];
    const weightedGap = gap * mix;

    return {
      task: task.key,
      taskLabel: task.label,
      selectedRate,
      bestRate,
      selectedTokenUsageRate,
      selectedTokenSavingsRate: averageTokenSavingsRate,
      gap,
      mix,
      weightedGap,
      selectedLatency,
      neutralLatency: latencyRow.neutral,
      weightedTokenUsage: selectedTokenUsageRate * mix,
      weightedTokenSavings: averageTokenSavingsRate * mix,
    };
  });

  const calculatedProductivityFactor = taskRows.reduce(
    (sum, row) => sum + row.weightedGap,
    0,
  );

  const calculatedTokenSavingsFactor = taskRows.reduce(
    (sum, row) => sum + row.weightedTokenSavings,
    0,
  );

  const weeklyTokenConsumption = taskRows.reduce(
    (sum, row) => sum + row.weightedTokenUsage,
    0,
  ) * promptsPerHour * inputs.weeklyLlmHours * taskTokenMultiplier;
  const annualTokenConsumption = weeklyTokenConsumption * 52;
  const weeklyHoursRecovered = inputs.weeklyLlmHours * calculatedProductivityFactor;
  const annualHoursRecovered = weeklyHoursRecovered * 52;
  const hourlyRate = inputs.annualSalary / 2080;
  const weeklyValueCreated = weeklyHoursRecovered * hourlyRate;
  const annualValueCreated = weeklyValueCreated * 52;
  const weeklyTokenSavings = weeklyTokenConsumption * calculatedTokenSavingsFactor;
  const annualTokenSavings = weeklyTokenSavings * 52;
  const tokenCostRate = inputs.tokenCostPerMillion / 1_000_000;
  const weeklyTokenValueCreated = weeklyTokenSavings * tokenCostRate;
  const annualTokenValueCreated = weeklyTokenValueCreated * 52;

  const mixTotal = rawTaskMixTotal;
  const isMixValid = Math.abs(mixTotal - 1) < 0.00001;

  return {
    calculatedProductivityFactor,
    calculatedTokenSavingsFactor,
    weeklyTokenConsumption,
    annualTokenConsumption,
    weeklyHoursRecovered,
    annualHoursRecovered,
    weeklyValueCreated,
    annualValueCreated,
    weeklyTokenSavings,
    annualTokenSavings,
    weeklyTokenValueCreated,
    annualTokenValueCreated,
    taskRows,
    mixTotal,
    isMixValid,
  };
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatHours(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatTokenCount(value: number): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatTokenMillions(value: number): string {
  return `${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 1_000_000)}M`;
}
