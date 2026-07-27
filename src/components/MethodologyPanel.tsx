export function MethodologyPanel() {
  return (
    <section className="panel full-width">
      <div className="panel-header">Notes and methodology</div>

      <details className="details-panel methodology-details">
        <summary className="details-summary">
          <span>Open notes and methodology</span>
          <span className="details-summary-note">(click for details)</span>
          <span className="details-chevron" aria-hidden="true">
            ▾
          </span>
        </summary>

        <div className="notes-grid details-content">
          <div>
            <div className="subsection-title">How this estimate works</div>
            <ul className="notes-list">
              <li>
                The calculator applies task-level observed opportunity rates from the evaluation set.
              </li>
              <li>
                Best observed opportunity is used as the comparison basis for estimating recoverable time and value.
              </li>
              <li>
                Users now select a role/function. The role drives task mix automatically from preset role profiles.
              </li>
              <li>
                Token savings use a single average savings rate for each task across all personality types, then blend those task rates by role/task mix.
              </li>
              <li>
                Estimated token volume is calculated from your weekly LLM hours and role task mix using the
                token usage table from the Calculation Detail tab (multiplied by 40), with an assumed 60 prompts/hour.
              </li>
              <li>
                Weekly and annual value estimates are based on user-entered LLM hours and hourly wage.
              </li>
              <li>
                Token value savings are estimated from weekly token volume × token savings factor × token cost (per 1M tokens).
              </li>
              <li>
                Task mix starts from role presets and can be adjusted by the user.
              </li>
            </ul>
          </div>

          <div>
            <div className="subsection-title">Important interpretation notes</div>
            <ul className="notes-list">
              <li>
                This is a directional ROI model based on observed evaluation outcomes, not a guarantee of realized savings.
              </li>
              <li>
                Results are sensitive to task mix, weekly LLM use, token volume, and the wage/value assumptions you enter.
              </li>
              <li>
                The model estimates productivity and token efficiency upside from improved prompt-persona alignment, not total business value from AI adoption.
              </li>
              <li>
                Latency differences are shown for context in the task-level details view and do not directly change the ROI output.
              </li>
            </ul>
          </div>
        </div>

        <div className="footnote details-content">
          Use this calculator as an executive planning tool to illustrate the potential economic value of better prompt-persona alignment across different types of AI-supported work.
        </div>
      </details>
    </section>
  );
}
