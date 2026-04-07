import type { CalculatorResult } from '../types';
import { formatCurrency, formatHours, formatPercent } from '../utils/calculator';

interface ResultsPanelProps {
  result: CalculatorResult;
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  const sortedRows = [...result.taskRows].sort((a, b) => b.weightedGap - a.weightedGap);
  const maxBar = Math.max(...sortedRows.map((row) => row.weightedGap), 0.0001);

  return (
    <section className="panel">
      <div className="panel-header">Outputs</div>

      <div className="metric-grid">
        <Metric label="Selected CQI lift vs neutral" value={formatPercent(result.selectedLift)} />
        <Metric
          label="Best observed headroom"
          value={formatPercent(result.bestObservedHeadroom)}
        />
        <Metric
          label="Applied productivity factor"
          value={formatPercent(result.appliedProductivityFactor)}
        />
        <Metric label="Weekly hours recovered" value={formatHours(result.weeklyHoursRecovered)} />
        <Metric label="Annual hours recovered" value={formatHours(result.annualHoursRecovered)} />
        <Metric label="Weekly value created" value={formatCurrency(result.weeklyValueCreated)} />
        <Metric label="Annual value created" value={formatCurrency(result.annualValueCreated)} />
      </div>

      <div className="section-spacer" />

      <div className="subsection-title">Task-level opportunity</div>
      <div className="task-table-wrap">
        <table className="task-table compact">
          <thead>
            <tr>
              <th>Task</th>
              <th>Selected</th>
              <th>Best</th>
              <th>Gap</th>
              <th>Weighted gap</th>
              <th>Latency vs neutral</th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => {
              const delta = row.selectedLatency - row.neutralLatency;
              const fasterOrSlower = delta <= 0 ? 'faster' : 'slower';
              return (
                <tr key={row.task}>
                  <td>{row.taskLabel}</td>
                  <td>{formatPercent(row.selectedRate)}</td>
                  <td>{formatPercent(row.bestRate)}</td>
                  <td>{formatPercent(row.gap)}</td>
                  <td>{formatPercent(row.weightedGap)}</td>
                  <td>
                    {Math.abs(delta).toFixed(1)}s {fasterOrSlower}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="section-spacer" />

      <div className="subsection-title">Weighted opportunity by task</div>
      <div className="bar-chart">
        {sortedRows.map((row) => (
          <div className="bar-row" key={row.task}>
            <div className="bar-label">{row.taskLabel}</div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{ width: `${(row.weightedGap / maxBar) * 100}%` }}
              />
            </div>
            <div className="bar-value">{formatPercent(row.weightedGap)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
    </div>
  );
}
