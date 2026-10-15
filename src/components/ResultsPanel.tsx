import type { CalculatorResult } from '../types';
import {
  formatCurrency,
  formatHours,
  formatPercent,
  formatTokenCount,
  formatTokenMillions,
} from '../utils/calculator';

interface ResultsPanelProps {
  result: CalculatorResult;
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  const sortedRows = [...result.taskRows].sort((a, b) => b.weightedGap - a.weightedGap);
  const maxBar = Math.max(...sortedRows.map((row) => row.weightedGap), 0.0001);
  const topProductivityDrivers = sortedRows.slice(0, 3);
  const topTokenDriver = [...result.taskRows].sort(
    (a, b) => b.weightedTokenSavings - a.weightedTokenSavings,
  )[0];
  const productivityDriverLabels = topProductivityDrivers.map((row) => row.taskLabel).join(', ');

  return (
    <section className="panel">
      <div className="panel-header">
        <span>Outputs</span>
      </div>

      <div className="metric-grid">
        <Metric
          label="Annual value created"
          value={formatCurrency(result.annualValueCreated)}
          tone="value"
        />
        <Metric
          label="Weekly value created"
          value={formatCurrency(result.weeklyValueCreated)}
          tone="value"
        />
        <Metric
          label="Calculated productivity factor"
          value={formatPercent(result.calculatedProductivityFactor)}
        />
        <Metric
          label="Token savings factor"
          value={formatPercent(result.calculatedTokenSavingsFactor)}
        />
      </div>

      <div className="section-spacer" />

      <details className="details-panel">
        <summary className="details-summary">
          <span>Explain this estimate</span>
          <span className="details-summary-note">(click for details)</span>
          <span className="details-chevron" aria-hidden="true">
            ▾
          </span>
        </summary>

        <div className="results-explainer details-content">
          <p className="results-explainer-copy">
            The biggest productivity upside in this role mix comes from {productivityDriverLabels}.
            Token savings are driven most by {topTokenDriver.taskLabel}, where usage intensity and
            average prompt savings are both relatively high.
          </p>
        </div>
      </details>

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

      <div className="section-spacer" />

      <details className="details-panel">
        <summary className="details-summary">
          <span>Supporting calculation details</span>
          <span className="details-summary-note">(click for details)</span>
          <span className="details-chevron" aria-hidden="true">
            ▾
          </span>
        </summary>

        <div className="metric-grid supporting-metrics details-content">
          <Metric label="Weekly hours recovered" value={formatHours(result.weeklyHoursRecovered)} />
          <Metric label="Annual hours recovered" value={formatHours(result.annualHoursRecovered)} />
          <Metric
            label="Estimated weekly token volume"
            value={formatTokenMillions(result.weeklyTokenConsumption)}
          />
          <Metric
            label="Estimated annual token volume"
            value={formatTokenMillions(result.annualTokenConsumption)}
          />
          <Metric label="Weekly tokens saved" value={formatTokenMillions(result.weeklyTokenSavings)} />
          <Metric label="Annual tokens saved" value={formatTokenMillions(result.annualTokenSavings)} />
        </div>
      </details>

      <div className="section-spacer" />

      <details className="details-panel">
        <summary className="details-summary">
          <span>Task-level drivers</span>
          <span className="details-summary-note">(click for details)</span>
          <span className="details-chevron" aria-hidden="true">
            ▾
          </span>
        </summary>

        <div className="task-table-wrap details-content">
          <table className="task-table compact">
            <thead>
              <tr>
                <th>Task</th>
                <th>Role mix</th>
                <th>Weighted gap</th>
                <th>Token usage</th>
                <th>Avg token savings</th>
                <th>Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row) => (
                <tr key={row.task}>
                  <td>{row.taskLabel}</td>
                  <td>{formatPercent(row.mix)}</td>
                  <td>{formatPercent(row.weightedGap)}</td>
                  <td>{formatTokenCount(row.selectedTokenUsageRate)}</td>
                  <td>{formatPercent(row.selectedTokenSavingsRate)}</td>
                  <td className="task-why-cell">
                    High impact from a {formatPercent(row.mix)} workload share with a{' '}
                    {formatPercent(row.gap)} prompt alignment gap.
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}

function Metric({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: string;
  tone?: 'default' | 'value';
}) {
  return (
    <div className={`metric-card${tone === 'value' ? ' metric-card-value' : ''}`}>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value || '—'}</div>
    </div>
  );
}
