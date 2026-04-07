export function MethodologyPanel() {
  return (
    <section className="panel full-width">
      <div className="panel-header">Notes and methodology</div>

      <div className="notes-grid">
        <div>
          <div className="subsection-title">How this estimate works</div>
          <ul className="notes-list">
            <li>
              The calculator applies task-level observed opportunity rates from the evaluation set.
            </li>
            <li>
              Best Observed Opportunity is used as the comparison basis for estimating recoverable
              time and value.
            </li>
            <li>
              Task mix weights are used to calculate the blended productivity factor across the
              selected work pattern.
            </li>
            <li>
              Weekly and annual value estimates are based on user-entered LLM hours and hourly wage.
            </li>
          </ul>
        </div>

        <div>
          <div className="subsection-title">Important interpretation notes</div>
          <ul className="notes-list">
            <li>
              This is a directional ROI model based on observed evaluation outcomes, not a guarantee
              of realized savings.
            </li>
            <li>
              Results are sensitive to task mix, the amount of weekly LLM use, and the wage value
              assigned to that time.
            </li>
            <li>
              The model estimates productivity upside from improved prompt-persona alignment, not
              total business value from AI adoption.
            </li>
            <li>
              Latency differences are shown for context in the task-level details view and do not
              directly change the ROI output.
            </li>
          </ul>
        </div>
      </div>

      <div className="footnote">
        Use this calculator as an executive planning tool to illustrate the potential economic value
        of better prompt-persona alignment across different types of AI-supported work.
      </div>
    </section>
  );
}