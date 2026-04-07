import { profiles, tasks } from '../data/evalData';
import type { Inputs, RoiBasis, TaskKey } from '../types';
import { formatPercent } from '../utils/calculator';

interface InputsPanelProps {
  inputs: Inputs;
  mixTotal: number;
  isMixValid: boolean;
  onInputChange: <K extends keyof Inputs>(key: K, value: Inputs[K]) => void;
  onTaskMixChange: (task: TaskKey, value: number) => void;
  onNormalize: () => void;
}

const roiBasisOptions: { value: RoiBasis; label: string; help: string }[] = [
  {
    value: 'best_observed_opportunity',
    label: 'Best Observed Opportunity',
    help: 'Uses the weighted best result seen for each task in the initial dataset.',
  },
  {
    value: 'selected_lift',
    label: 'Selected CQI Lift vs Neutral',
    help: 'Uses the weighted lift of the currently selected profile vs the neutral baseline.',
  },
];

export function InputsPanel({
  inputs,
  mixTotal,
  isMixValid,
  onInputChange,
  onTaskMixChange,
  onNormalize,
}: InputsPanelProps) {
  return (
    <section className="panel">
      <div className="panel-header">Inputs</div>

      <div className="input-grid">
        <label>
          <span>Profile baseline</span>
          <select
            value={inputs.profileKey}
            onChange={(event) => onInputChange('profileKey', event.target.value)}
          >
            {profiles.map((profile) => (
              <option key={profile.key} value={profile.key}>
                {profile.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Weekly LLM use</span>
          <input
            type="number"
            min="0"
            step="0.5"
            value={inputs.weeklyLlmHours}
            onChange={(event) => onInputChange('weeklyLlmHours', Number(event.target.value))}
          />
        </label>

        <label>
          <span>Hourly value</span>
          <input
            type="number"
            min="0"
            step="1"
            value={inputs.hourlyValue}
            onChange={(event) => onInputChange('hourlyValue', Number(event.target.value))}
          />
        </label>

        <label>
          <span>ROI basis</span>
          <select
            value={inputs.roiBasis}
            onChange={(event) => onInputChange('roiBasis', event.target.value as RoiBasis)}
          >
            {roiBasisOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="helper-text muted">
        {
          roiBasisOptions.find((option) => option.value === inputs.roiBasis)?.help
        }
      </div>

      <div className="section-spacer" />

      <div className="subsection-title">Task mix</div>
      <div className="task-table-wrap">
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Mix</th>
              <th>Sample prompt</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.key}>
                <td>{task.label}</td>
                <td>
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
                </td>
                <td className="sample-prompt">{task.samplePrompt}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{formatPercent(mixTotal)}</td>
              <td>{isMixValid ? 'Ready' : 'Must equal 100%'}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="inline-actions">
        <button type="button" className="ghost-button" onClick={onNormalize}>
          Normalize to 100%
        </button>
        <span className={isMixValid ? 'status-ok' : 'status-warn'}>
          {isMixValid ? 'Task mix is valid.' : 'Adjust or normalize the mix so the total equals 100%.'}
        </span>
      </div>
    </section>
  );
}
