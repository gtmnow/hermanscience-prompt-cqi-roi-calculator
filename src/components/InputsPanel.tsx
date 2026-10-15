import { defaultTokenCostPerMillion, profiles, roles, tasks } from '../data/evalData';
import type { Inputs, ProfileKey, RoleKey, TaskKey } from '../types';
import { formatPercent } from '../utils/calculator';

interface InputsPanelProps {
  inputs: Inputs;
  onInputChange: <K extends keyof Inputs>(key: K, value: Inputs[K]) => void;
  onRoleChange: (roleKey: RoleKey) => void;
  onTaskMixChange: (task: TaskKey, value: number) => void;
  onNormalizeTaskMix: () => void;
  isTaskMixOpen: boolean;
  onTaskMixOpenChange: (isOpen: boolean) => void;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value || 0);
}

export function InputsPanel({
  inputs,
  onInputChange,
  onRoleChange,
  onTaskMixChange,
  onNormalizeTaskMix,
  isTaskMixOpen,
  onTaskMixOpenChange,
}: InputsPanelProps) {
  const handleTokenCostChange = (rawValue: string) => {
    const numeric = Number(rawValue);
    if (!Number.isFinite(numeric) || Number.isNaN(numeric) || numeric < 0) {
      return;
    }

    const roundedToStep = Math.round((numeric * 100) / 5) * 5 / 100;
    onInputChange('tokenCostPerMillion', Number(roundedToStep.toFixed(2)));
  };

  const mixTotal = Object.values(inputs.taskMix).reduce((sum, value) => sum + value, 0);
  const isMixValid = Math.abs(mixTotal - 1) < 0.00001;

  return (
    <section className="panel">
      <div className="panel-header">Inputs</div>

      <div className="panel-intro">
        Choose the role, prompt type, and a few business assumptions. The task mix starts from
        role defaults and can be adjusted if this team works differently.
      </div>

      <div className="input-grid">
        <label className="input-grid-full">
          <span>Function / role</span>
          <select value={inputs.roleKey} onChange={(event) => onRoleChange(event.target.value as RoleKey)}>
            {roles.map((role) => (
              <option key={role.key} value={role.key}>
                {role.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>User Personality Type</span>
          <select
            value={inputs.profileKey}
            onChange={(event) => onInputChange('profileKey', event.target.value as ProfileKey)}
          >
            {profiles.map((profile) => (
              <option key={profile.key} value={profile.key}>
                {profile.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Weekly LLM use (hours)</span>
          <input
            type="number"
            min="0"
            step="0.5"
            value={inputs.weeklyLlmHours}
            onChange={(event) => onInputChange('weeklyLlmHours', Number(event.target.value))}
          />
        </label>

        <label>
          <span>Fully burdened annual salary (dollars)</span>
          <div className="currency-input-wrap">
            <span className="currency-prefix">$</span>
            <input
              className="currency-input"
              type="text"
              inputMode="numeric"
              value={formatNumber(inputs.annualSalary)}
              onChange={(event) => {
                const raw = event.target.value.replace(/,/g, '');
                const numeric = Number(raw);
                if (!isNaN(numeric)) {
                  onInputChange('annualSalary', numeric);
                }
              }}
            />
          </div>
        </label>

        <label>
          <span>Token cost per 1M (USD)</span>
          <input
            type="number"
            min="0"
            step="0.05"
            value={inputs.tokenCostPerMillion}
            onChange={(event) => handleTokenCostChange(event.target.value)}
            placeholder={defaultTokenCostPerMillion.toFixed(2)}
          />
          <small>
            Default is blended public API price (${defaultTokenCostPerMillion.toFixed(2)}).
          </small>
        </label>
      </div>

      <div className="section-spacer" />

      <details
        className="details-panel role-task-mix-panel"
        open={isTaskMixOpen}
        onToggle={(event) =>
          onTaskMixOpenChange((event.currentTarget as HTMLDetailsElement).open)
        }
      >
        <summary className="details-summary">
          <span>Task mix inputs (role defaults)</span>
          <span className="details-summary-note">(click for details)</span>
          <span className="details-chevron" aria-hidden="true">
            ▾
          </span>
        </summary>

        <div className="role-task-table-wrap details-content">
          <div className="mix-list">
            {tasks.map((task) => (
              <label className="mix-row" key={task.key}>
                <span className="mix-row-label">{task.label}</span>
                <div className="mix-cell">
                  <input
                    className="mix-input"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={(inputs.taskMix[task.key] * 100).toFixed(0)}
                    onChange={(event) =>
                      onTaskMixChange(task.key, Number(event.target.value) / 100)
                    }
                  />
                  <span className="mix-suffix">%</span>
                </div>
              </label>
            ))}
          </div>
          <div className="mix-footer">
            <div className="mix-total-card">
              <span className="mix-total-label">Total</span>
              <span className="mix-total-value">
                {formatPercent(mixTotal)} {isMixValid ? '' : '(adjust to 100%)'}
              </span>
            </div>
            <button type="button" className="ghost-button ghost-button-small" onClick={onNormalizeTaskMix}>
              Normalize to 100%
            </button>
          </div>
          <div className="inline-actions">
            <span className={isMixValid ? 'status-ok' : 'status-warn'}>
              {isMixValid ? 'Task mix total is 100%.' : 'Task mix total is not 100%.'}
            </span>
          </div>
        </div>
      </details>
    </section>
  );
}
